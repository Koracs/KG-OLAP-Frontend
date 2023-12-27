import {fetchContexts} from "@/app/lib/data";
import Link from "next/link";

export default async function ResultContexts({uuid, query, currentPage}) {
    const contexts = await fetchContexts(uuid, query, currentPage);

    return (
        <div className={"contexts"}>
            {contexts.map((context) => {
                return (
                        <Link key={context} className={"button context"} href={`/results/${uuid}?context=${context}`}>{context}</Link>
                )
            })}
        </div>
    )
}