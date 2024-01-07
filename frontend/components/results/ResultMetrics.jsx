import prisma from "@/app/db";

export default async function ResultMetrics({uuid}) {
    const results = await prisma.QueryResult.findUnique({
        where: {
            id: uuid
        }
    });

    const total_time = (results?.ts_end - results?.ts_start) / 1000;
    const build_time = (results?.ts_3 - results?.ts_2) / 1000;
    const context_time = (results?.ts_2 - results?.ts_0) / 1000;

    return(
        <>
        {results?.testMode? <h2 style={{color:"var(--error-color)"}}>Test Mode Query!</h2> : <></>}
        <div>
            <p>Start time: {results?.ts_start.toLocaleString()}</p>
            <p>merge operation finished: {results?.ts_0.toLocaleString()}</p>
            <p>specific context info retrieved: {results?.ts_1.toLocaleString()}</p>
            <p>general context info: {results?.ts_2.toLocaleString()}</p>
            <p>rdf cube built: {results?.ts_3.toLocaleString()}</p>
            <p>cleanup finished: {results?.ts_end.toLocaleString()}</p>
            <br/>
            <p>context_count: {results?.context_count}</p>
            <p>quad_count: {results?.quad_count}</p>
            <p>char_count: {results?.char_count}</p>
            <br/>
            <p>total time (seconds): {total_time}</p>
            <p>build time (seconds): {build_time}</p>
            <p>context time (seconds): {context_time}</p>
        </div>
        </>
    )
}