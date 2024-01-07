import Link from "next/link";
import {deleteResult, rerunResult} from "@/app/_lib/resultaction";
import ReRunButton from "@/components/ui/ReRunButton";

export default function ResultItem({uuid, queryText, lastUpdate, testMode}) {

    async function deleteAction() {
        "use server"
        await deleteResult(uuid);
    }

    async function rerunAction() {
        "use server"
        await rerunResult(uuid);
    }

    return (
        <form className={"resultitem-container"}>
            <Link className={"resultitem-uuid"} href={`/results/${uuid}`}>{uuid}</Link>
            <span className={"resultitem-queryText"}><b>Query:</b> {queryText}</span>
            <span className={"resultitem-lastUpdate"}><b>Last Update:</b> {lastUpdate.toLocaleString()}</span>
            {testMode? <span style={{color:"var(--error-color)"}} className={"resultitem-testMode"}>Test Mode!</span> : null}
            <Link className={"button resultitem-table"} href={`/results/${uuid}/table`}>Show Table</Link>
            <Link className={"button resultitem-contexts"} href={`/results/${uuid}/contexts`}>Show Contexts</Link>
            <Link className={"button resultitem-metrics"} href={`/results/${uuid}/metrics`}>Show Metrics</Link>
            <ReRunButton rerunAction={rerunAction} className={"button resultitem-rerun"}/>
            <button formAction={deleteAction} className={"button error-button resultitem-delete"}>Delete</button>
        </form>
    )
}