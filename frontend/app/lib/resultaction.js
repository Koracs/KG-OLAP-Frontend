"use server"
import fs from "fs";
import prisma from '../db'
import {redisClient} from "@/app/redis";


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
    //delete entry in redis with uuid
    await redisClient.del(uuid).then((result) => {
        console.log("Delete Redis Entry " + uuid + " successfully.");
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
        console.log("Update DB Entry " + uuid + " successfully.");
    }).catch((error) => {
        console.warn(error);
    });
}
