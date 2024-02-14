"use server"

import prisma from '../db'
import {redisClient} from "@/app/redis";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {executeQuery} from "@/app/_lib/queryaction";
import {isRedirectError} from "next/dist/client/components/redirect";

/**
 * Deletes a result from the database and redis
 * @param {string} uuid
 * @returns {Promise<void>}
 */
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

/**
 * Reruns a result by deleting the current results and running the query again
 * @param {string} uuid
 * @returns {Promise<void>}
 */
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

/**
 * Deletes a result from the database
 * @param {string} uuid
 * @returns {Promise<void>}
 */
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

/**
 * Deletes a result from redis
 * @param {string} uuid
 * @returns {Promise<void>}
 */
export async function deleteRedisEntry(uuid) {
    let keys = [];
    await scanKeys(0, uuid, keys);

    keys.forEach((key) => {
        redisClient.del(key).catch((error) => {
            console.warn(error);
        });
    });
}

/**
 * Fetches the keys for a given uuid from redis
 * @param {number} cursor - Redis cursor, start with 0
 * @param {string} uuid
 * @param {[]} returnSet
 * @returns {Promise<any>}
 */
function scanKeys(cursor, uuid,  returnSet) {
    return redisClient.scan(cursor, {MATCH: uuid + "*"}).then((result) => {
        cursor = result.cursor;
        returnSet.push(...result.keys);
        if (cursor === 0) {
            return returnSet;
        } else {
            return scanKeys(cursor, uuid, returnSet)
        }
    });
}