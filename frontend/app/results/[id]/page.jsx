import ResultItem from "@/components/resultItem";
import prisma from "@/app/db";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import {deleteResult, updateResult} from "@/app/lib/resultaction";

export default async function ResultPage({params}) {
    const result = await prisma.QueryResult.findUnique({where: {id: params?.id}});
    async function deleteAction() {
        "use server"
        await deleteResult(params?.id);
    }

    async function rerunAction() {
        "use server"
        await updateResult(params?.id)
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
            <p>Query: {result?.queryText}</p>
            <span className={"resultitem-lastUpdate"}><b>Created:</b> {result?.createdAt.toLocaleString()}</span>
            <span className={"resultitem-lastUpdate"}><b>Last Update:</b> {result?.updatedAt.toLocaleString()}</span>
            <Link className={"button resultitem-table"} href={`/results/${result?.id}/table`}>Show Table</Link>
            <Link className={"button resultitem-contexts"} href={`/results/${result?.id}/contexts`}>Show Contexts</Link>
            <Link className={"button resultitem-metrics"} href={`/results/${result?.id}/metrics`}>Show Metrics</Link>
            <button formAction={rerunAction} className={"button resultitem-rerun"}>Re-Run Query</button>
            <button formAction={deleteAction} className={"button error-button resultitem-delete"}>Delete</button>
        </>
    )
}