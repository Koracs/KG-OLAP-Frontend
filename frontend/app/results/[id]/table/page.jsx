import Search from "../../../../components/search";
import ResultTable from "../../../../components/resultTable";
import {fetchResultPages} from "../../../lib/data";
import Pagination from "../../../../components/pagination";
import {Suspense} from "react";
import Breadcrumbs from "../../../../components/breadcrumbs";

export default async function QueryResult({params, searchParams}) {
    const query = searchParams?.query || '';
    const context = searchParams?.context || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchResultPages(params?.id, context);

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                { label: 'Results', href: '/results' },
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Table',
                    href: `/results/${params?.id}/Table`,
                    active: true,
                }
            ]} />
            <h1>Query Result </h1>
            {searchParams?.context && <h3>Context: {searchParams?.context}</h3>}
            <Search placeholder={"Search Table..."}/>
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <ResultTable uuid={params?.id} currentPage={currentPage} query={query} context={context}/>
            </Suspense>
            <div className={"pagination-div"}>
            <Pagination totalPages={totalPages}/>
            </div>
            {/*<Table data={result}/>*/}
            {/*<Link className={"button"} href={params?.id + "/graph"}>Show Graph</Link>*/}
        </>
    )
}