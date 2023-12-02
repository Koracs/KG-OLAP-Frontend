import {readFile} from "fs/promises";
import Table from "../../../components/table";

export default async function QueryResult({params}) {
    const fileData = JSON.parse(await readFile(`./testData/${params?.id}`, "utf8"));
    return (
        <>
            <h1>Query Result </h1>
            <h2>{params?.id}</h2>
            <Table data={fileData}/>
        </>
    )
}