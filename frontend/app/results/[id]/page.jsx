import Search from "../../../components/search";
import ResultTable from "../../../components/resultTable";
import {fetchResultPages} from "../../lib/data";
import Pagination from "../../../components/pagination";
import {Suspense} from "react";

export default async function QueryResult({params, searchParams}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchResultPages(params?.id);

    return (
        <>
            <h1>Query Result </h1>
            <h2>{params?.id}</h2>
            <Search placeholder={"Search Table..."}/>
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <ResultTable uuid={params?.id} currentPage={currentPage} query={query}/>
            </Suspense>
            <div className={"pagination-div"}>
            <Pagination totalPages={totalPages}/>
            </div>
            {/*<Table data={result}/>*/}
            {/*<Link className={"button"} href={params?.id + "/graph"}>Show Graph</Link>*/}
        </>
    )
}