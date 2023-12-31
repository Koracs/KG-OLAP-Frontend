import Breadcrumbs from "../../../../components/breadcrumbs";
import ResultContexts from "@/components/resultContexts";
import {fetchContextPages} from "@/app/lib/data";
import Search from "@/components/search";
import {Suspense} from "react";
import Pagination from "@/components/pagination";

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