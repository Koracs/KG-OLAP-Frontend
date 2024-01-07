import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import {deleteResult, rerunResult} from "@/app/_lib/resultaction";
import ReRunButton from "@/components/ui/ReRunButton";
import {fetchResultItem} from "@/app/_lib/data";

export default async function ResultPage({params}) {
    const result = await fetchResultItem(params.id);

    const quad_count = result?.quad_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const context_count = result?.context_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const total_time = (result?.ts_end - result?.ts_start) / 1000;

    async function deleteAction() {
        "use server"
        await deleteResult(params?.id);
    }

    async function rerunAction() {
        "use server"
        await rerunResult(params?.id)
    }

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {label: 'Results', href: '/results'},
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                    active: true
                }
            ]}/>
            <h1>{params?.id}</h1>
            {result?.testMode? <h2 style={{color:"var(--error-color)"}}>Test Mode Query!</h2> : <></>}
            <br/>
            <h2>Query Results</h2>
            <div className={"result"}>
                <div className={"result-text"}>
                    <p><b>Query String:</b><br/>{result?.queryText}</p>
                    <br/>
                    <p><b>Quad Count:</b> {quad_count}</p>
                    <p><b>Total Contexts:</b> {context_count}</p>
                </div>
                <div className={"result-links"}>
                    <Link className={"button result-link"} href={`/results/${result?.id}/table`}>Show Table</Link>
                    <Link className={"button result-link"} href={`/results/${result?.id}/contexts`}>Show
                        Contexts</Link>
                </div>
            </div>
            <br/>
            <h2>Query Metrics</h2>
            <div className={"result"}>
                <div className={"result-text"}>
                    <p><b>Created:</b> {result?.createdAt.toLocaleString()}</p>
                    <p><b>Last Update:</b> {result?.updatedAt.toLocaleString()}</p>
                    <p><b>Total Time (seconds):</b> {total_time}</p>
                </div>
                <div className={"result-links"}>
                    <Link className={"button result-link"}
                          href={`/results/${result?.id}/metrics`}>Show
                        Metrics</Link>
                </div>
            </div>
            <br/>
            <form>
                <ReRunButton className={"button result-link"} rerunAction={rerunAction}/>
                <button formAction={deleteAction}
                        className={"button error-button result-link"}>Delete Result
                </button>
            </form>
        </>
    )
}