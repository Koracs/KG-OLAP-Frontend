"use server";
import * as fs from "fs";
import N3 from "n3";
import prisma from '../db'
import {revalidatePath} from "next/cache";
import {redisClient} from "../redis";
import {redirect} from "next/navigation";

/**
 * Executes a given query and stores the results in the database and redis
 * @param {string} queryString KGOLAP query string
 * @param {boolean} testMode If true, test data will be used instead of fetching from KGOLAP
 * @param {string} uuid If given, the results will be stored in the database and redis with this uuid
 * @returns {Promise<{error}>} Error message if an error occurred, otherwise redirects to the results page
 */
export async function executeQuery(queryString, testMode, uuid) {
    try {
        uuid = uuid === undefined ? await createDatabaseEntry(queryString, testMode) : uuid;

        if (testMode) {
            await getTestData(uuid);
        } else {
            await getKGData(uuid, queryString);
        }

        console.log("Query " + queryString + " executed successfully. UUID: " + uuid + " Test Mode: " + testMode);
    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }

    revalidatePath("/results")
    redirect("/results/" + uuid)
}

/**
 * Creates a database entry for a given query string
 * @param {string} queryString
 * @param {boolean} testMode
 * @returns {Promise<string>} UUID of the created entry
 */
function createDatabaseEntry(queryString, testMode) {
    //create entry in database with query string
    return prisma.queryResult.create({
        data: {
            queryText: queryString,
            testMode: testMode
        }
    }).then((result) => {
        return result.id;
    }).catch((error) => {
        console.warn(error);
    });
}

/**
 * Adds result metrics to a given database entry
 * @param {string} uuid
 * @param {{}} resultMetrics
 * @returns {Promise<string>} UUID of the updated entry
 */
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
            filename: resultMetrics.filename
        }
    }).then((result) => {
        return result.id;
    }).catch((error) => {
        console.warn(error);
    });
}

/**
 * Fetches the KGOLAP prefix from the KGOLAP_PREFIX_URL environment variable
 * @returns {Promise<{prefix: string, replacement: string}>} Prefix and replacement
 */
async function getKGPrefix() {
    const prefix_url = process.env.KGOLAP_PREFIX_URL;
    const username = process.env.KGOLAP_USERNAME;
    const password = process.env.KGOLAP_PASSWORD;

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
    headers.set('Content-Type', 'application/json');
    headers.set('charset', 'utf-8');
    const response = await fetch(prefix_url,
        {
            method: 'GET',
            headers: headers,
            cache: 'no-store'
        });

    if (response.ok) {
        const prefix = await response.text();
        const replacement = "atm:";

        return {
            "prefix": prefix,
            "replacement": replacement
        }
    } else {
        throw new Error("Error while fetching prefix from KGOLAP: " + response.status);
    }
}

/**
 * Fetches the data for a given query from KGOLAP and stores it in the database and redis
 * @param {string} uuid
 * @param {string} queryString
 * @returns {Promise<void>}
 */
async function getKGData(uuid, queryString) {
    const cube_url = process.env.KGOLAP_CUBE_URL;
    const file_url = process.env.KGOLAP_FILE_URL;
    const username = process.env.KGOLAP_USERNAME;
    const password = process.env.KGOLAP_PASSWORD;

    const prefix = await getKGPrefix();

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
    headers.set('Content-Type', 'application/json');
    headers.set('charset', 'utf-8');
    const response = await fetch(cube_url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query: queryString}),
            cache: 'no-store'
        });

    if (response.ok) {
        const metrics = JSON.parse(await response.text())
        await addResultMetrics(uuid, metrics);
        const fileResponse = await fetch(file_url + `?fileUuid=${metrics.filename}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-store'
            });

        if (fileResponse.ok) {
            parseData(uuid, await fileResponse.text(), prefix);
        } else {
            throw new Error("Error while fetching file from KGOLAP: " + fileResponse.status);
        }
    } else {
        throw new Error("Error while fetching data from KGOLAP: " + response.status);
    }
}

/**
 * Fetches test data from the file system and stores it in the database and redis
 * @param {string} uuid
 * @returns {Promise<void>}
 */
async function getTestData(uuid) {
    fs.readFile("./testData/timestamps.json", (err, data) => {
        if (err) throw err;
        addResultMetrics(uuid, JSON.parse(data));
    });

    const prefix = {
        "prefix": "http://example.org/bigkgolap/atm/",
        "replacement": "atm:"
    }
    const fileStream = fs.createReadStream("./testData/LargeResult.nq");
    await parseData(uuid, fileStream, prefix);
}

/**
 * Parses a given input stream and stores the quads in redis
 * @param {string} uuid
 * @param {inputStream} inputStream
 * @param {{prefix: string, replacement: string}} prefix
 */
function parseData(uuid, inputStream, prefix) {
    const parser = new N3.Parser({format: 'N-Quads'});
    parser.parse(inputStream, quadCallback);

    async function quadCallback(error, quad, prefixes) {
        if (quad) {
            const quadData = {
                subject: quad.subject.value.replace(prefix.prefix, prefix.replacement),
                predicate: quad.predicate.value.replace(prefix.prefix, prefix.replacement),
                object: quad.object.value.replace(prefix.prefix, prefix.replacement),
                context: quad.graph.value.replace(prefix.prefix, prefix.replacement)
            }
            await redisClient.rPush(uuid, JSON.stringify(quadData)).then((result) => {
                return result;
            }).catch((error) => {
                console.warn(error);
            });
            await redisClient.sAdd(uuid + ":contexts", quadData.context);
            await redisClient.rPush(uuid + ":" + quadData.context, JSON.stringify(quadData));
        }
    }

}