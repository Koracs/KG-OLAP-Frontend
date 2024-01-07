"use client"
import {useState} from "react";
import {executeQuery} from "@/app/_lib/queryaction";
import CodeEditor from "@uiw/react-textarea-code-editor";
import styles from "../../app/globals.css" //used for theme change of code editor
import { useFormStatus } from "react-dom";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={"button"}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

export default function QueryWindow() {
    const [error, setError] = useState("");
    const [queryString, setQueryString] = useState("");

    async function clientAction(formData) {
        //client side validation
        const query = queryString.trim();
        const match = query.match(/^SELECT((\s\*)|(?:\s\w+=[^\s]+)(?:\sAND\s\w+=[^\s]+)*)(\sROLLUP ON(\s\w+)((,\s\w+)*))?$/)
        if (match == null) {
            setError("Invalid query string");
            return;
        }

        //server side validation
        const testMode = formData.get("testMode")?.valueOf() === "testMode";
        const result = await executeQuery(query, testMode);

        if (result?.error) {
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
                onChange={(evn) => {
                    setQueryString(evn.target.value);
                    setError("");
                }}
                padding={15}
                minHeight={100}
                className={"codeEditor"}
                autoCapitalize={"none"}
            />
            {error && (<div className={"errorMessage"}>{error}</div>)}
            <form action={clientAction} className={"queryWindow"}>
                <div style={{alignSelf:"center"}}>
                    <label htmlFor="testMode">Test Mode </label>
                    <input type="checkbox" name="testMode" value="testMode"/>
                </div>
                <Submit/>
                {/*<button type="submit" className={"button"}>Submit</button>*/}
            </form>
        </div>
    );
}