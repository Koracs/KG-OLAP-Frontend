"use server";
import * as fs from "fs";
import N3 from "n3";
import prisma from '../db'
import {revalidatePath} from "next/cache";
import {redisClient} from "../redis";


export async function serverAction(queryString, testMode) {
    try {
        const uuid = await createDatabaseEntry(queryString);

        if (testMode) {
            await getTestData(uuid);
        } else {
            await getKGData(uuid, queryString);
        }

    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }
    revalidatePath("/results")
}

function createDatabaseEntry(queryString) {
    //create entry in database with query string
    return prisma.queryResult.create({
        data: {
            queryText: queryString
        }
    }).then((result) => {
        return result.id;
    }).catch((error) => {
        console.warn(error);
    });
}

function addTimeStamps(uuid, timestamps) {
    return prisma.queryResult.update({
        data: {
            ts_start: timestamps.ts_start
        }
    }).then((result) => {
        return result.id;
    }).catch((error) => {
        console.warn(error);
    });
}

async function getKGData(uuid, queryString) {
    const surface_url_post = process.env.KGOLAP_SURFACE_URL_POST;
    const surface_url_get = process.env.KGOLAP_SURFACE_URL_GET;
    const username = process.env.KGOLAP_USERNAME;
    const password = process.env.KGOLAP_PASSWORD;

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
    headers.set('Content-Type', 'application/json');
    headers.set('charset', 'utf-8');
    const response = await fetch(surface_url_post,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query: queryString}),
            cache: 'no-store'
        });

    if (response.ok) {
        const timestamps = await response.json()
        await addTimeStamps(uuid, timestamps);

        const fileResponse = await fetch(surface_url_get + `?fileName=${timestamps.filename}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-store'
            });

        if (fileResponse.ok) {
            console.log("file request ok")
            //parseData(uuid, await fileResponse.text());
        } else {
            throw new Error("Error while fetching file from KGOLAP: " + fileResponse.status);
        }
    } else {
        throw new Error("Error while fetching data from KGOLAP: " + response.status);
    }
}

async function getTestData(uuid) {
    const inputStream = fs.createReadStream("./testData/1.nq");
    await parseData(uuid, inputStream);
}

function parseData(uuid, inputStream) {
    const parser = new N3.Parser({format: 'N-Quads'});
    parser.parse(inputStream, quadCallback);

    async function quadCallback(error, quad, prefixes) {
        if (quad) {
            const quadData = {
                subject: quad.subject.value,
                predicate: quad.predicate.value,
                object: quad.object.value,
                context: quad.graph.value
            }
            await redisClient.rPush(uuid, JSON.stringify(quadData));
        }
    }

}