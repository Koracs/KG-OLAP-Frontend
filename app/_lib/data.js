import {redisClient} from "@/app/redis";
import prisma from "@/app/db";

const QUADS_PER_PAGE = 20;
const CONTEXTS_PER_PAGE = 10;

/**
 * Fetches quads for a given uuid, context, query and page index
 * @param {string} uuid
 * @param {string} query
 * @param {number} currentPage
 * @param {string} context
 * @returns {Promise<[]>} Array of quads in the form of {subject: string, predicate: string, object: string, context: string}
 */
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

/**
 * Fetches all quads for a given uuid and context
 * @param {string} uuid
 * @param {string} context
 * @returns {Promise<[]>} Array of quads in the form of {subject: string, predicate: string, object: string, context: string}
 */
export async function fetchAllQuads(uuid, context) {
    const key = uuid + ":" + context;
    const quads = await redisClient.lRange(key, 0, -1);
    return quads.map((item) => JSON.parse(item));
}

/**
 * Fetches all contexts for a given uuid, query and page index
 * @param {string} uuid
 * @param {string} query
 * @param {number} currentPage
 * @returns {Promise<[]>} Array of contexts in the form of {context: string}
 */
export async function fetchContexts(uuid, query, currentPage) {
    const start = (currentPage - 1) * CONTEXTS_PER_PAGE;
    const end = start + CONTEXTS_PER_PAGE;
    let contexts = [];
    await scanRedisSet(0, uuid, query, contexts);

    return contexts.slice(start, end);
}

/**
 * Fetches the number of quads for a given uuid and context
 * @param {string} uuid
 * @param {string} context
 * @returns {Promise<number>} Number of quads
 */
export async function fetchContextQuadCount(uuid, context) {
    const key = uuid + ":" + context;
    return await redisClient.LLEN(key);
}

/**
 * Fetches the number of contexts for a given uuid and query
 * @param {string} uuid
 * @param {string} query
 * @returns {Promise<number>} Number of contexts
 */
export async function fetchContextPages(uuid, query) {
    let contexts = [];
    await scanRedisSet(0, uuid, query, contexts);
    return Math.ceil(contexts?.length / CONTEXTS_PER_PAGE);
}

/**
 * Fetches the quads for a given uuid and query from a redis set
 * @param {number} cursor - Redis cursor, start with 0
 * @param {string} uuid
 * @param {string} query
 * @param {[]} returnSet
 * @returns {Promise<any>}
 */
function scanRedisSet(cursor, uuid, query, returnSet) {
    return redisClient.sScan(uuid + ":contexts", cursor, {MATCH: "*" + query + "*"}).then((result) => {
        cursor = result.cursor;
        returnSet.push(...result.members);
        if (cursor === 0) {
            return returnSet;
        } else {
            return scanRedisSet(cursor, uuid, query, returnSet)
        }
    });
}

/**
 * Fetches the number of table pages for a given uuid and context
 * @param {string} uuid
 * @param {string} context
 * @returns {Promise<number>} Number of table pages
 */
export async function fetchResultPages(uuid, context) {
    const key = context ? uuid + ":" + context : uuid;
    const quadCount = await redisClient.LLEN(key);

    return Math.ceil(quadCount / QUADS_PER_PAGE);
}

/**
 * Fetches all result items from the database
 * @returns {Promise<[]>} Array of result items
 */
export async function fetchAllResultItems() {
    return await prisma.QueryResult.findMany({orderBy: {updatedAt: "asc"}});
}

/**
 * Fetches a result item from the database
 * @param {string} uuid
 * @returns {Promise<*>} Result item
 */
export async function fetchResultItem(uuid) {
    return await prisma.QueryResult.findUnique({where: {id: uuid}});
}
