"use server"

import prisma from '../db'
import {redisClient} from "@/app/redis";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function deleteResult(uuid) {
    console.log("hello")
    await deleteDBEntry(uuid);
    await deleteRedisEntry(uuid);

    revalidatePath("/results")
    redirect("/results")
}

export async function updateResult(uuid) {
    const result = await prisma.QueryResult.findUnique({where: {id: uuid}});
    await updateDBEntry(uuid, result.queryText);
    //await updateFile(fileName); todo update redis

    revalidatePath("/results")
    revalidatePath("/results/" + uuid)
}


export async function deleteDBEntry(uuid) {
    //delete entry in database with query string
    prisma.queryResult.delete({
        where: {
            id: uuid
        }
    }).then((result) => {
        console.log("Delete DB Entry " + uuid + " successfully.");
    }).catch((error) => {
        console.warn(error);
    });

}

export async function deleteRedisEntry(uuid) {
    const keys = await redisClient.scan(0,{MATCH: uuid+"*"} ).then((result) => {
        return result.keys;
    });
    keys.forEach((key) => {
        redisClient.del(key).catch((error) => {
            console.warn(error);
        });
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
        console.log("Update DB Entry " + uuid + " successfully.");
    }).catch((error) => {
        console.warn(error);
    });
}
