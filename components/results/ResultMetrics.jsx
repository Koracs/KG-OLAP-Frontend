import prisma from "@/app/db";

export default async function ResultMetrics({uuid}) {
    const results = await prisma.QueryResult.findUnique({
        where: {
            id: uuid
        }
    });

    const total_time = (results?.ts_end - results?.ts_start);
    const build_time = (results?.ts_3 - results?.ts_2);
    const context_time = (results?.ts_2 - results?.ts_0);

    return (
        <>
            {results?.testMode ? <h2 style={{color: "var(--error-color)"}}>Test Mode Query!</h2> : null}
            <br/>
            <h2>Query Timestamps</h2>
            <table>
                <thead>
                <tr>
                    <th>Step</th>
                    <th>Timestamp</th>
                    <th>Unix Timestamp</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Start Time</th>
                    <td>{results?.ts_start.toLocaleString()}</td>
                    <td>{results?.ts_start.getTime()}</td>
                </tr>
                <tr>
                    <th>Merge Operation Finished</th>
                    <td>{results?.ts_0.toLocaleString()}</td>
                    <td>{results?.ts_0.getTime()}</td>
                </tr>
                <tr>
                    <th>Specific Context Info Retrieved</th>
                    <td>{results?.ts_1.toLocaleString()}</td>
                    <td>{results?.ts_1.getTime()}</td>
                </tr>
                <tr>
                    <th>General Context Info</th>
                    <td>{results?.ts_2.toLocaleString()}</td>
                    <td>{results?.ts_2.getTime()}</td>
                </tr>
                <tr>
                    <th>Rdf Cube Built</th>
                    <td>{results?.ts_3.toLocaleString()}</td>
                    <td>{results?.ts_3.getTime()}</td>
                </tr>
                <tr>
                    <th>Cleanup Finished</th>
                    <td>{results?.ts_end.toLocaleString()}</td>
                    <td>{results?.ts_end.getTime()}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <h2>Query Times</h2>
            <table>
                <thead>
                <tr>
                    <th>Step</th>
                    <th>Time (s)</th>
                    <th>Time (ms)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Build Time</th>
                    <td>{build_time / 1000}</td>
                    <td>{build_time}</td>
                </tr>
                <tr>
                    <th>Context Time</th>
                    <td>{context_time / 1000}</td>
                    <td>{context_time}</td>
                </tr>
                <tr>
                    <th>Total Time</th>
                    <td>{total_time / 1000}</td>
                    <td>{total_time}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <h2>Result Information</h2>
            <table>
                <thead>
                <tr>
                    <th>Information</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <th>Context Count</th>
                    <td>{results?.context_count}</td>
                </tr>
                <tr>
                    <th>Quad Count</th>
                    <td>{results?.quad_count}</td>
                </tr>
                <tr>
                    <th>Char Count</th>
                    <td>{results?.char_count}</td>
                </tr>
                <tr>
                    <th>File UUID</th>
                    <td>{results?.filename}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}