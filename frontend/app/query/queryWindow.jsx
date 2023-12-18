"use client"

import {useState} from "react";
import {serverAction} from "./queryaction";
import CodeEditor from "@uiw/react-textarea-code-editor";


export default function QueryWindow() {
    const [error, setError] = useState("");
    const [queryString, setQueryString] = useState("");


    async function clientAction(formData) {
        //client side validation
        const query = queryString.trim();
        const match = query.match(/^SELECT((\s\*)|(?:\s\w+=[^\s]+)(?:\sAND\s\w+=[^\s]+)*)(\sROLLUP ON(\s\w+)((,\s\w+)*))?$/)
        if(match == null) {
            setError("Invalid query string");
            return;
        }

        //server side validation
        const mode = formData.get("testMode")?.valueOf();
        const result = await serverAction(query, mode);

        if(result?.error){
            setError(result.error);
        } else {
            setError("");
        }
    }

    return (
        <div>
            <CodeEditor
                value={queryString}
                language="sql"
                placeholder="Enter query"
                onChange={(evn) => setQueryString(evn.target.value)}
                padding={15}
                minHeight={100}
                className={"codeEditor"}
            />
            {error && (<div className={"errorMessage"}>{error}</div>)}
            <form action={clientAction} className={"queryWindow"}>
                <label htmlFor="testMode">Test Mode</label>
                <input type="checkbox" name="testMode" value="testMode" defaultChecked/>
                <p/>
                <button type="submit" className={"button"}>submit</button>
            </form>
        </div>
    );
}