"use server";

import {redirect} from "next/navigation";
import rdfParser from "rdf-parse";
import * as fs from "fs";
import N3 from "n3";
import {prefixes} from "n3/lib/N3Util";


export const serverAction = async (query) => {
    try {
        const queryString = query.get("queryInput")?.valueOf();

        const result = getTestData();
        console.log(result);
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
    const surface_url = "http://140.78.58.65:8080/cube";
    const username = "bigkgolap";
    const password = "b1gkg0lap4ss#2022";

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
    let result = [];

    const parser = new N3.Parser({format: 'N-Quads', baseIRI: 'http://example.org/bigkgolap/'});
    parser.parse(textStream, (error, quad, prefixes) => {
        if (quad) {
            console.log({quad});
            result.push(quad);
        }
    });
    return result;
}