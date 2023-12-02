import Link from "next/link";
import {deleteDBEntry, deleteFile, updateDBEntry, updateFile} from "./resultaction";
import {revalidatePath} from "next/cache";

export default function ResultItem({uuid, queryText, lastUpdate}) {
    const fileName = uuid + ".json";

    async function deleteAction(data) {
        "use server"
        await deleteDBEntry(uuid);
        await deleteFile(fileName);

        revalidatePath("/results")
    }

    async function rerunAction(data) {
        "use server"
        //todo implement re-run query
        await updateDBEntry(uuid, queryText);
        await updateFile(fileName);

        revalidatePath("/results")
    }

    return (
        <form className={"resultitem-container"}>
            <h3 className={"resultitem-fileName"}>{fileName}</h3>
            <span className={"resultitem-queryText"}>Query Text: {queryText}</span>
            <span className={"resultitem-lastUpdate"}>Last Update: {lastUpdate.toLocaleString()}</span>
            <Link className={"button resultitem-results"} href={`/results/${fileName}`}>Show result</Link>
            <button formAction={rerunAction} className={"button resultitem-rerun"}>Re-Run Query</button>
            <button formAction={deleteAction} className={"button resultitem-delete"}>Delete</button>
        </form>
    )
}