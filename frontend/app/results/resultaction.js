

import fs from "fs";


export async function deleteDBEntry(uuid) {
    //delete entry in database with query string
    prisma.queryResult.delete({
        where: {
            id: uuid
        }
    }).then((result) => {
        console.log("Delete DB Entry " & uuid & " successfully.");
    }).catch((error) => {
        console.warn(error);
    });

}

export async function updateDBEntry(uuid, queryText) {
    //update entry in database with query string
    prisma.queryResult.update({
        where: {
            id: uuid
        }, data: {
            queryText: queryText
        }
    }).then((result) => {
        console.log("Update DB Entry " & uuid & " successfully.");
    }).catch((error) => {
        console.warn(error);
    });
}

export async function deleteFile(fileName) {
    const directoryPath = "./testData/";
    fs.unlink(directoryPath + fileName, (err) => {
        if (err) throw err;
        console.log("Delete File " & fileName & " successfully.");
    });
}

export async function updateFile(fileName) {
    const directoryPath = "./testData/";
}

