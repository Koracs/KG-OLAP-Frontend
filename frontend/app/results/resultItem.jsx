import Link from "next/link";
import fs from "fs";

export default function ResultItem({uuid, queryText, lastUpdate}) {
    const fileName = uuid + ".json";
    const directoryPath = "./testData/";

    async function resultAction(data) {
        "use server"
        if (data.get("delete_button") === "delete") {
            //delete file with filename from props
            fs.unlink(directoryPath + fileName, (err) => {
                if (err) throw err;
                console.log("Delete File " & fileName & " successfully.");
            });
        }

        //todo implement rerun query
    }

    return (
        <form action={resultAction} className={"resultitem-container"}>
            <h3 className={"resultitem-fileName"}>{fileName}</h3>
            <span className={"resultitem-queryText"}>Query Text: {queryText}</span>
            <span className={"resultitem-lastUpdate"}>Last Update: {lastUpdate.toLocaleString()}</span>
            <Link className={"button resultitem-results"} href={`/results/${fileName}`}>Show result</Link>
            <button type="submit" name="update_button" value="update" className={"button resultitem-rerun"}>Re-Run Query</button>
            <button type="submit" name="delete_button" value="delete" className={"button resultitem-delete"}>Delete</button>
        </form>
    )
}