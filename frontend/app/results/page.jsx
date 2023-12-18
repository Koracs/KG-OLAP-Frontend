import path from 'path';
import ResultItem from "./resultItem";
import prisma from "../db";
import redisClient from "../redis";

export default async function ResultFiles() {
    const results = await prisma.QueryResult.findMany({orderBy: {updatedAt: "asc"}})

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