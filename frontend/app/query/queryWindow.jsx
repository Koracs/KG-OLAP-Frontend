"use client"

import {useState} from "react";
import {serverAction} from "./queryaction";
import CodeEditor from "@uiw/react-textarea-code-editor";
import styles from "../globals.css"


export default function QueryWindow() {
    const [error, setError] = useState("");
    const [queryString, setQueryString] = useState("");


    async function clientAction(query) {
        //client side validation
        const text = queryString.trim();
        const match = text.match(/^SELECT((\s\*)|(?:\s\w+=[^\s]+)(?:\sAND\s\w+=[^\s]+)*)(\sROLLUP ON(\s\w+)((,\s\w+)*))?$/)
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
            <form action={clientAction}>
                <CodeEditor
                    value={queryString}
                    language="sql"
                    placeholder="Enter query"
                    onChange={(evn) => setQueryString(evn.target.value)}
                    padding={15}
                    className={"codeEditor"}
                />
                {error && (<div className={"errorMessage"}>{error}</div>)}
                <p/>
                <label htmlFor="testMode">Test Mode</label>
                <input type="checkbox" name="testMode" value="testMode" defaultChecked/>
                <p/>
                <button type="submit" className={"button"}>submit</button>
            </form>
        </div>
    );
}