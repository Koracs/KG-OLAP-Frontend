import ResultMetrics from "../../../../components/resultMetrics";

export default async function MetricsPage({params}) {


    return (
        <>
            <h1>Query Result Metrics</h1>
            <h2>{params?.id}</h2>
            <ResultMetrics uuid={params?.id}/>
        </>
    )
}