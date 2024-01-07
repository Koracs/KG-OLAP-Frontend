import {fetchContextQuadCount, fetchContexts} from "@/app/_lib/data";
import Link from "next/link";

export default async function ResultContexts({uuid, query, currentPage}) {
    const contexts = await fetchContexts(uuid, query, currentPage);

    async function getContextLength(context) {
        const length = await fetchContextQuadCount(uuid, context);
        return length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className={"contexts"}>
            {contexts.map((context) => {
                return (
                    <>
                        <Link key={context} className={"button contextLink"} href={`/results/${uuid}/table?context=${context}`}>{context}</Link>
                        <p className={"context-quads"}>{getContextLength(context)}</p>
                        <Link key={context+"graph"} className={"button contextLink"} href={`/results/${uuid}/graph?context=${context}`}>Show Graph</Link>
                    </>
                )
            })}
        </div>
    )
}