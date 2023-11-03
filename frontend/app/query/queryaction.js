"use server";

import {redirect} from "next/navigation";

export const serverAction = async (query) => {
    try {
        const text = query.get("queryInput")?.valueOf();
        //throw new Error("Query Endpoint not implemented");


    } catch (error) {
        console.error(error);
        return {
            error: error.message,
        }
    }
    redirect("/query/result")
}