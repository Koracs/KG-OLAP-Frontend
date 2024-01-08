import ResultMetrics from "../../../../components/results/ResultMetrics";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";

export default async function MetricsPage({params}) {


    return (
        <>
            <Breadcrumbs breadcrumbs={[
                { label: 'Results', href: '/results' },
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Metrics',
                    href: `/results/${params?.id}/metrics`,
                    active: true,
                }
            ]} />
            <h1>Query Result Metrics</h1>
            <ResultMetrics uuid={params?.id}/>
        </>
    )
}