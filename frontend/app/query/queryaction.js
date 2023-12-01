"use server";

import * as fs from "fs";
import N3 from "n3";
import * as os from "os";


export const serverAction = async (query) => {
    try {
        const queryString = query.get("queryInput")?.valueOf();

        const writeSteam = fs.createWriteStream("./testData/1.json");
        writeSteam.write("["+ os.EOL);
        getTestData();
        writeSteam.write("]"); //todo does not work
        writeSteam.end();
        //throw new Error("Query Endpoint not implemented");
    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }
    //redirect("/query/result")
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

function getTestData() {
    const textStream = fs.createReadStream("./testData/1.nq");
    const writeSteam = fs.createWriteStream("./testData/1.json");
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
            console.log(quadData)
            writeSteam.write(JSON.stringify(quadData) + "," + os.EOL);
        }
    });
}
