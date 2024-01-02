"use client"

import CodeEditor from "@uiw/react-textarea-code-editor";
import {useState} from "react";

export default function LandingCodeEditor() {
    const [queryString, setQueryString] = useState("SELECT time_month=2000-01 AND location_territory=France ROLLUP ON topic_all, location_all, time_all");

    return (
        <CodeEditor
            value={queryString}
            language="sql"
            placeholder="Enter query"
            onChange={(evn) => {
                setQueryString(evn.target.value);
            }}
            padding={15}
            minHeight={100}
            className={"codeEditor"}
            autoCapitalize={"none"}
            style={{fontSize:"14px"}}
        />
    )
}