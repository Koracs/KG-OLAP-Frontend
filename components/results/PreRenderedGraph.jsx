import {fetchAllQuads} from "@/app/_lib/data";
import preRenderGraph from "@/app/_lib/pre-render-graph";
import SvgViewer from "@/components/results/SvgViewer";

export default async function PreRenderedGraph({uuid, context, width, height, force}) {
    const quads = await fetchAllQuads(uuid, context);
    const svg = await preRenderGraph(quads, width, height, force);

    return (
        <>
            {/*<div dangerouslySetInnerHTML={{ __html:svg}} />*/}
            <SvgViewer svg={svg} width={width} height={height}/>
        </>
    )
}