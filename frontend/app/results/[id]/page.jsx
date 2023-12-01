import {readFile} from "fs/promises";
import Table from "../../../components/table";

export default async function QueryResult({params}) {
    const fileData = JSON.parse(await readFile(`./testData/${params?.id}`, "utf8"));
    return (
        <>
            <h1>Query Result {params?.id}</h1>
            <Table data={fileData}/>
        </>
    )
}