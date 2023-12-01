import Link from "next/link";
import fs from "fs";
export default function ResultItem({fileName}) {
    const directoryPath = "./testData/";
    async function resultAction(data) {
        "use server"
        if(data.get("delete_button") === "delete"){
            //delete file with filename from props
            fs.unlink(directoryPath + fileName, (err) => {
                if (err) throw err;
                console.log("Delete File " & fileName & " successfully.");
            });
        }

        //todo implement rerun query
    }

    return (
        <form action={resultAction}>
            <span style={{display:"inline-block"}}>{fileName}</span>
            <Link className={"button"} href={`/results/${fileName}`}>Show result</Link>
            <span style={{display:"inline"}}/>
            <button type="submit" name="update_button" value="update" className={"button"}>Re-Run Query</button>
            <span style={{display:"inline"}}/>
            <button type="submit" name="delete_button" value="delete" className={"button"}>Delete</button>
        </form>
    )
}