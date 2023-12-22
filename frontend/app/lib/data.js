import {redisClient} from "../redis";

const QUADS_PER_PAGE = 10;
export async function fetchFilteredQuads(uuid, query, currentPage) {
    const start = (currentPage - 1) * QUADS_PER_PAGE;
    const end = start + QUADS_PER_PAGE - 1;

    const quads = await redisClient.lRange(uuid, start, end);
    const result = quads.map((item) => JSON.parse(item));

    return result;
}

export async function fetchAllQuads(uuid) {
    const quads = await redisClient.lRange(uuid, 0, -1);
    const result = quads.map((item) => JSON.parse(item));

    return result;
}

export async function fetchResultPages(uuid) {
    const quadCount =  await redisClient.LLEN(uuid);
    return Math.ceil(quadCount / QUADS_PER_PAGE);
}
