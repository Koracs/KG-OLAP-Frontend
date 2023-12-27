import {redisClient} from "@/app/redis";
import prisma from "@/app/db";

const QUADS_PER_PAGE = 10;
export async function fetchFilteredQuads(uuid, query, currentPage) {
    const start = (currentPage - 1) * QUADS_PER_PAGE;
    const end = start + QUADS_PER_PAGE - 1;

    const quads = await redisClient.lRange(uuid, start, end);
    let result = quads.map((item) => JSON.parse(item));

    if (query) {
        result = result.filter((quad) => {
            return quad.subject.toLowerCase().includes(query.toLowerCase()) ||
                quad.predicate.toLowerCase().includes(query.toLowerCase()) ||
                quad.object.toLowerCase().includes(query.toLowerCase()) ||
                quad.context.toLowerCase().includes(query.toLowerCase());
        });
    }

    return result;
}

export async function fetchAllQuads(uuid) {
    const quads = await redisClient.lRange(uuid, 0, -1);
    const result = quads.map((item) => JSON.parse(item));

    return result;
}

export async function fetchContexts(uuid, query, currentPage) {
    const contexts = await redisClient.sMembers(uuid + ":contexts");

    return contexts;
}

export async function fetchContextPages(uuid, query) {
    const contexts = await redisClient.sScan(uuid + ":contexts", 0, "MATCH", "*" + query + "*").then((result) => {
        return {
            members: result.members
        }
    });
    console.log(query)
    console.log(contexts)
    return Math.ceil(1 / QUADS_PER_PAGE);
}

export async function fetchResultPages(uuid) {
    const quadCount =  await redisClient.LLEN(uuid);
    return Math.ceil(quadCount / QUADS_PER_PAGE);
}
