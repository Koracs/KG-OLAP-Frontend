import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import ResultGraph from "../../../../components/resultgraph";
import {readFile} from "fs/promises";
import preRenderGraph from "../pre-render-graph";

export default async function ResultGraphPage({params}) {
    const fileData = JSON.parse(await readFile(`./testData/${params?.id}`, "utf8"));
    const svg = await preRenderGraph(fileData);

    return (
        <>
            <h1>Query Result Graph</h1>
            <h2>{params?.id}</h2>
            <div dangerouslySetInnerHTML={{ __html:svg}} />
            {/*<ResultGraph triples={fileData}/>*/}
        </>
    )
}