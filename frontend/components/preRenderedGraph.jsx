import {fetchAllQuads} from "@/app/lib/data";
import preRenderGraph from "@/app/lib/pre-render-graph";
import Image from "next/image";
import fs from "fs";
import SVG from 'react-inlinesvg';
import SvgViewer from "@/components/svgViewer";

export default async function PreRenderedGraph({uuid, context}) {
    const quads = await fetchAllQuads(uuid, context);
    const svg = await preRenderGraph(quads);

    return (
        <>
            <h2>{context}</h2>
            <div dangerouslySetInnerHTML={{ __html:svg}} />
            <SvgViewer svg={svg}/>
        </>
    )
}