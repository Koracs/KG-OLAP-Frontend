"use server";

import {redirect} from "next/navigation";
import rdfParser from "rdf-parse";
import * as fs from "fs";
import N3 from "n3";
import {prefixes} from "n3/lib/N3Util";


export const serverAction = async (query) => {
    try {
        const text = query.get("queryInput")?.valueOf();
        //throw new Error("Query Endpoint not implemented");
        const textStream = fs.createReadStream("./testData/1.nq");

        /*rdfParser.parse(textStream, { contentType: "application/n-quads", baseIRI: "http://example.org/bigkgolap/" })
            .on("data", (quad) => console.log(quad))
            .on("error", (error) => console.error(error))
            .on("end", () => console.log("All done!"));
        */

        const parser = new N3.Parser({ format: 'N-Quads', baseIRI: 'http://example.org/bigkgolap/' });
        parser.parse(textStream, (error, quad, prefixes) => {
            if (quad)
                console.log(quad);
            else
                console.log("# That's all, folks!", prefixes);
        });

    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }
    //redirect("/query/result")
}