"use server"

import prisma from '../db'
import {redisClient} from "@/app/redis";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {executeQuery} from "@/app/lib/queryaction";
import {isRedirectError} from "next/dist/client/components/redirect";

export async function deleteResult(uuid) {
    try {
        await deleteDBEntry(uuid);
        await deleteRedisEntry(uuid);
    } catch (error) {
        console.error(error);
    }
    revalidatePath("/results")
    redirect("/results")
}

export async function rerunResult(uuid) {
    try {
        //get query string and test mode indicator from database
        const result = await prisma.queryResult.findUnique({
            where: {
                id: uuid
            }
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.warn(error);
        });

        //delete current results in redis
        await deleteRedisEntry(uuid);

        //run query again
        await executeQuery(result.queryText, result.testMode, uuid);
    } catch (error) {
        if(isRedirectError(error)) return;
        else console.error(error);
    }

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
    const keys = await redisClient.scan(0, {MATCH: uuid + "*"}).then((result) => {
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
