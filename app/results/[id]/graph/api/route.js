import {downloadGraph} from "@/app/_lib/pre-render-graph";
import {fetchAllQuads} from "@/app/_lib/data";

export async function GET(request, { params }) {
    const searchParams = request.nextUrl.searchParams
    const uuid = params.id;
    const context = searchParams.get("context")
    const width = Number(searchParams.get("width"))
    const height = Number(searchParams.get("height"))
    const force = Number(searchParams.get("force"))

    const quads = await fetchAllQuads(uuid, context);
    const svg = await downloadGraph(quads, width, height, force);

    return Response.json(svg)
}