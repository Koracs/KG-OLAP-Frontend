import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import ResultContexts from "@/components/results/ResultContexts";
import {fetchContextPages} from "@/app/_lib/data";
import Search from "@/components/ui/Search";
import {Suspense} from "react";
import Pagination from "@/components/ui/Pagination";

export default async function ContextsPage({params, searchParams}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchContextPages(params?.id, query);

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {label: 'Results', href: '/results'},
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Contexts',
                    href: `/results/${params?.id}/contexts`,
                    active: true,
                }
            ]}/>
            <h1>Query Result Contexts</h1>
            <div className={"context-search"}>
                <Search placeholder={"Search Contexts..."} width={"100%"}/>
                <span className={"context-quads"}><b>Total Quads</b></span>
                <span></span>
            </div>
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <ResultContexts uuid={params?.id} currentPage={currentPage} query={query}/>
            </Suspense>
            <div className={"pagination-div"}>
                <Pagination totalPages={totalPages}/>
            </div>
        </>
    )
}