"use server";

import * as fs from "fs";
import N3 from "n3";
import * as os from "os";
import prisma from '../db'
import {revalidatePath} from "next/cache";


export const serverAction = async (query) => {
    try {
        const queryString = query.get("queryInput")?.valueOf();

        const uuid = await createDatabaseEntry(queryString);
        createFile(uuid);
        getTestData(uuid);
        //createResultFile(queryString);

        //throw new Error("Query Endpoint not implemented");
    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }
    //redirect("/query/result")
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

function createFile(uuid) {
    //create file with uuid as name
    const directoryPath = "./testData/";
    const fileName = uuid + ".json";

    fs.writeFile(directoryPath + fileName, "", (err) => {
        if (err) throw err;
        console.log("Create File " + fileName + " successfully.");
    });
}

async function getKGData(queryString) {
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
            body: JSON.stringify({query: "SELECT time_month=2000-01 ROLLUP ON time_all"}),
            cache: 'no-store'
        });
    /*const data = await response.text();
    console.log(data);*/
}

function getTestData(uuid) {
    const textStream = fs.createReadStream("./testData/1.nq");
    const writeSteam = fs.createWriteStream("./testData/"+ uuid +".json");
    writeSteam.write("[");

    const parser = new N3.Parser({format: 'N-Quads', baseIRI: 'http://example.org/bigkgolap/'});
    parser.parse(textStream, (error, quad, prefixes) => {
        if (quad) {
            const quadData = {
                subject: quad.subject.value,
                predicate: quad.predicate.value,
                object: quad.object.value,
                context: quad.graph.value
            }
            writeSteam.write(JSON.stringify(quadData) + "," + os.EOL);
        }
    });

    //writeSteam.write("]"); //todo does not work
}
