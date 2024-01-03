export const dynamic = 'force-dynamic';
import ResultItem from "../../components/resultItem";
import Breadcrumbs from "../../components/breadcrumbs";
import {fetchAllResultItems} from "@/app/_lib/data";

export default async function ResultOverview() {
    const results = await fetchAllResultItems();

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