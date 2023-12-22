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

function addResultMetrics(uuid, resultMetrics) {
    return prisma.queryResult.update({
        where: {
            id: uuid
        },
        data: {
            ts_start: new Date(resultMetrics.ts_start),
            ts_0: new Date(resultMetrics.ts_0),
            ts_1: new Date(resultMetrics.ts_1),
            ts_3: new Date(resultMetrics.ts_3),
            ts_2: new Date(resultMetrics.ts_2),
            ts_end: new Date(resultMetrics.ts_end),
            context_count: resultMetrics.context_count,
            quad_count: resultMetrics.quad_count,
            char_count: resultMetrics.char_count,
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
        await addResultMetrics(uuid, timestamps);

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
    fs.readFile("./testData/timestamps.json", (err, data) => {
        if (err) throw err;
        addResultMetrics(uuid, JSON.parse(data));
    });


    const fileStream = fs.createReadStream("./testData/resultFile.nq");
    await parseData(uuid, fileStream);
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