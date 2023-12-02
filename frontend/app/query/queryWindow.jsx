"use client"

import {useState} from "react";
import {serverAction} from "./queryaction";

export default function QueryWindow() {
    const [error, setError] = useState("");

    async function clientAction(query) {
        //client side validation
        const text = query.get("queryInput")?.valueOf();
        const match = text.match(/^SELECT((\s\*)|(?:\s\w+=[^\s]+)(?:\sAND\s\w+=[^\s]+)*)(\sROLLUP ON(\s\w+)((,\s\w+)+))?$/)
        if(match == null) {
            setError("Invalid query string");
            return;
        }

        //server side validation
        const result = await serverAction(query);

        if(result?.error){
            setError(result.error);
        } else {
            setError("");
        }
    }

    return (
        <div>
            <form action={clientAction} className={"queryWindow"}>
                <textarea name="queryInput" placeholder={"Enter Query"} rows={5}/>
                {error && (<div className={"errorMessage"}>{error}</div>)}
                <p/>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}