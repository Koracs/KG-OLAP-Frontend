import Search from "@/components/search";
import ResultTable from "@/components/resultTable";
import {fetchResultPages} from "@/app/_lib/data";
import Pagination from "@/components/pagination";
import {Suspense} from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";

export default async function QueryResult({params, searchParams}) {
    const query = searchParams?.query || '';
    const context = searchParams?.context || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchResultPages(params?.id, context);

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {label: 'Results', href: '/results'},
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Table',
                    href: `/results/${params?.id}/Table`,
                    active: true,
                }
            ]}/>
            <h1>Query Result </h1>
            {searchParams?.context && <h2>Context: {searchParams?.context}</h2>}
            <div style={{width: "90%", margin: "auto"}}>
                <Search placeholder={"Search Table..."} width={"75%"}/>
                <Link className={"button search-button"} href={`/results/${params?.id}/contexts`}>Filter
                    Contexts</Link>
            </div>
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <ResultTable uuid={params?.id} currentPage={currentPage} query={query} context={context}/>
            </Suspense>
            <div className={"pagination-div"}>
                <Pagination totalPages={totalPages}/>
            </div>
        </>
    )
}