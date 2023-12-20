"use server";
import * as fs from "fs";
import N3 from "n3";
import * as os from "os";
import prisma from '../db'
import {revalidatePath} from "next/cache";
import redisClient from "../redis";


export const serverAction = async (queryString, testMode) => {
    try {
        const uuid = await createDatabaseEntry(queryString);

        if(testMode) {
            getTestData(uuid);
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

async function getKGData(uuid, queryString) {
    const surface_url = process.env.KGOLAP_SURFACE_URL;
    const username = process.env.KGOLAP_USERNAME;
    const password = process.env.KGOLAP_PASSWORD;

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
    headers.set('Content-Type', 'application/json');
    headers.set('charset', 'utf-8');
    const response = await fetch(surface_url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query: queryString}),
            cache: 'no-store'
        });

    if (response.ok) {
        const outputStream = fs.createWriteStream("./testData/"+ uuid +".json");
        parseData(uuid,await response.text(),outputStream);
    } else {
        throw new Error("Error while fetching data from KGOLAP: " + response.status);
    }

}

function getTestData(uuid) {
    const inputStream = fs.createReadStream("./testData/1.nq");
    parseData(uuid,inputStream);
}

function parseData(uuid,inputStream) {
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