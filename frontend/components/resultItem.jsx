import Link from "next/link";
import {deleteDBEntry, deleteFile, updateDBEntry, updateFile} from "../app/lib/resultaction";
import {revalidatePath} from "next/cache";

export default function ResultItem({uuid, queryText, lastUpdate}) {

    async function deleteAction(data) {
        "use server"
        await deleteDBEntry(uuid);
        //await deleteFile(fileName); todo delete from redis

        revalidatePath("/results")
    }

    async function rerunAction(data) {
        "use server"
        //todo implement re-run query
        await updateDBEntry(uuid, queryText);
        //await updateFile(fileName); todo update redis

        revalidatePath("/results")
    }

    return (
        <form className={"resultitem-container"}>
            <h3 className={"resultitem-uuid"}>{uuid}</h3>
            <span className={"resultitem-queryText"}>Query Text: {queryText}</span>
            <span className={"resultitem-lastUpdate"}>Last Update: {lastUpdate.toLocaleString()}</span>
            <Link className={"button resultitem-results"} href={`/results/${uuid}`}>Show Result</Link>
            <Link className={"button resultitem-metrics"} href={`/results/${uuid}/metrics`}>Show Metrics</Link>
            <button formAction={rerunAction} className={"button resultitem-rerun"}>Re-Run Query</button>
            <button formAction={deleteAction} className={"button error-button resultitem-delete"}>Delete</button>
        </form>
    )
}