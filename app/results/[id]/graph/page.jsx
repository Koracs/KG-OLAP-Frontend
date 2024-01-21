import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import PreRenderedGraph from "@/components/results/PreRenderedGraph";
import {Suspense} from "react";
import {redirect} from "next/navigation";
import ReRenderButton from "@/components/ui/ReRenderButton";

export default async function ResultGraphPage({params, searchParams}) {
    const width = Number(searchParams?.width) || 1280;
    const height = Number(searchParams?.height) || 720;
    const force = Number(searchParams?.force) || -10;

    async function rerender(formData) {
        "use server"
        const width = formData.get("width")
        const height = formData.get("height")
        const force = formData.get("force")

        redirect(`/results/${params?.id}/graph?context=${searchParams.context}&width=${width}&height=${height}&force=${force}`)
    }

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
            <form>
                <label htmlFor="width">Width: </label>
                <input type={"number"} id="width" name="width" defaultValue={width} />
                <label htmlFor="height"> Height: </label>
                <input type={"number"} id="heigth" name="height" defaultValue={height}/>
                <label htmlFor="force"> Force: </label>
                <input type={"number"} id="force" name="force" max={"0"} defaultValue={force}/>
                <ReRenderButton rerenderAction={rerender} className={"button"}/>
            </form>
            <h2>{searchParams.context}</h2>
            <Suspense fallback={<div>Generating Graph...</div>}>
                <PreRenderedGraph
                    uuid={params?.id}
                    context={searchParams.context}
                    width={width}
                    height={height}
                    force={force}/>
            </Suspense>
            <br/>
        </>
    )
}