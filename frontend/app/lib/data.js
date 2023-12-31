import {redisClient} from "@/app/redis";
import prisma from "@/app/db";

const QUADS_PER_PAGE = 20;
const CONTEXTS_PER_PAGE = 10;
export async function fetchFilteredQuads(uuid, query, currentPage, context) {
    const start = (currentPage - 1) * QUADS_PER_PAGE;
    const end = start + QUADS_PER_PAGE - 1;
    const key = context ? uuid + ":" + context : uuid;

    const quads = await redisClient.lRange(key, start, end);
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

export async function fetchAllQuads(uuid, context) {
    const key = uuid + ":" + context;
    const quads = await redisClient.lRange(key, 0, -1);
    const result = quads.map((item) => JSON.parse(item));

    return result;
}

export async function fetchContexts(uuid, query, currentPage) {
    const start = (currentPage - 1) * CONTEXTS_PER_PAGE;
    const end = start + CONTEXTS_PER_PAGE;
    const contexts = await redisClient.sScan(uuid + ":contexts", 0, {MATCH: "*"+query+"*"}).then((result) => {
        return result.members
    });

    return contexts.slice(start, end);
}

export async function fetchContextQuadCount(uuid, context) {
    const key = uuid + ":" + context;
    const quadCount =  await redisClient.LLEN(key);

    return quadCount;
}

export async function fetchContextPages(uuid, query) {
    const contexts = await redisClient.sScan(uuid + ":contexts", 0, {MATCH: "*"+query+"*"}).then((result) => {
        return result.members
    });

    return Math.ceil(contexts?.length / QUADS_PER_PAGE);
}

export async function fetchResultPages(uuid, context) {
    const key = context ? uuid + ":" + context : uuid;
    const quadCount =  await redisClient.LLEN(key);

    return Math.ceil(quadCount / QUADS_PER_PAGE);
}
