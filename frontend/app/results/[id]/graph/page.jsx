import preRenderGraph from "../../../lib/pre-render-graph";
import Breadcrumbs from "../../../../components/breadcrumbs";
import {fetchAllQuads} from "@/app/lib/data";
import SvgViewer from "@/components/svgViewer";
import PreRenderedGraph from "@/components/preRenderedGraph";
import {Suspense} from "react";

export default async function ResultGraphPage({params, searchParams}) {

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                {label: 'Results', href: '/results'},
                {
                    label: params?.id,
                    href: `/results/${params?.id}`,
                },
                {
                    label: 'Graph',
                    href: `/results/${params?.id}/graph`,
                    active: true,
                }
            ]}/>
            <h1>Query Result Graph</h1>
            <h2>{searchParams.context}</h2>
            <Suspense fallback={<div>Generating Graph...</div>}>
                <PreRenderedGraph uuid={params?.id} context={searchParams.context}/>
            </Suspense>
            <br/>
        </>
    )
}