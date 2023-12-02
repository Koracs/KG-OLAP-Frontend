import fs from 'fs';
import path from 'path';
import ResultItem from "./resultItem";

const dirPath = path.join("./testData/");
export default async function ResultFiles() {
    const results = await prisma.QueryResult.findMany({orderBy: {id: "asc"}})

    return (
        <>
            <h1>Saved Query Results</h1>
            <div>
                {results.map((item) => {
                    return (
                        <ResultItem
                            key={item.id}
                            uuid={item.id}
                            queryText={item.queryText}
                            lastUpdate={item.updatedAt}
                        />
                    )
                })}
            </div>
        </>
    )
}