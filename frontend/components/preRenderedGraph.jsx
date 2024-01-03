import {fetchAllQuads} from "@/app/_lib/data";
import preRenderGraph from "@/app/_lib/pre-render-graph";
import SvgViewer from "@/components/svgViewer";

export default async function PreRenderedGraph({uuid, context}) {
    const quads = await fetchAllQuads(uuid, context);
    const svg = await preRenderGraph(quads);

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html:svg}} />
            <SvgViewer svg={svg}/>
        </>
    )
}