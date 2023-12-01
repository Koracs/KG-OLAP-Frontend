import fs from 'fs';
import path from 'path';
import ResultItem from "./resultItem";

const dirPath = path.join("./testData/");
export default function ResultFiles() {
    //write a function that returns the file names of the files in the directory
    function getFiles(dirPath) {
        let files = fs.readdirSync(dirPath);
        return files;
    }

    const results = getFiles(dirPath);


    return (
        <>
            <h1>Results</h1>
            {results.map((item) => {
                return (
                    <div key={item}> <ResultItem fileName={item}/></div>
                )
            })}
        </>
    )
}