import preRenderGraph from "../../../lib/pre-render-graph";
import Breadcrumbs from "../../../../components/breadcrumbs";
import {fetchAllQuads} from "@/app/lib/data";
import SvgViewer from "@/components/svgViewer";

export default async function ResultGraphPage({params}) {
    const quads = await fetchAllQuads(params?.id);
    const svg = await preRenderGraph(quads);

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                { label: 'Results', href: '/results' },
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Graph',
                    href: `/results/${params?.id}/graph`,
                    active: true,
                }
            ]} />
            <h1>Query Result Graph</h1>
            <h2>{params?.id}</h2>
            <div dangerouslySetInnerHTML={{ __html:svg}} />
            <SvgViewer/>
        </>
    )
}