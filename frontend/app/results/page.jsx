import ResultItem from "../../components/resultItem";
import prisma from "../db";

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