"use client"

import CodeEditor from "@uiw/react-textarea-code-editor";
import {useState} from "react";
import styles from "../../app/globals.css" //used for theme change of code editor

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
            className={"code-editor"}
            autoCapitalize={"none"}
            style={{fontSize:"14px"}}
        />
    )
}