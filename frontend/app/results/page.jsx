import fs from 'fs';
import path from 'path';
import ResultItem from "./resultItem";

const dirPath = path.join("./testData/");
export default async function ResultFiles() {
    //write a function that returns the file names of the files in the directory
    function getFiles(dirPath) {
        let files = fs.readdirSync(dirPath);
        return files;
    }

    //const results = getFiles(dirPath);
    const results = await prisma.QueryResult.findMany()

    return (
        <>
            <h1>Saved Query Results</h1>
            <div>
                {results.map((item) => {
                    return (
                        <ResultItem
                            uuid={item.id}
                            queryText={item.queryText}
                            lastUpdate={item.updatedAt}
                        />
                    )
                })}
            </div>
        </>
    )
}