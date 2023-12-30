import ResultItem from "../../components/resultItem";
import prisma from "../db";
import Breadcrumbs from "../../components/breadcrumbs";

export default async function ResultOverview() {
    const results = await prisma.QueryResult.findMany({orderBy: {updatedAt: "asc"}})

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {
                    label: 'Results',
                    href: `/results`,
                    active: true
                }
            ]}/>
            <h1>Saved Query Results</h1>
            <div>
                {results.map((item) => {
                    return (
                        <ResultItem
                            key={item.id}
                            uuid={item.id}
                            queryText={item.queryText}
                            lastUpdate={item.updatedAt}
                            testMode={item.testMode}
                        />
                    )
                })}
            </div>
        </>
    )
}