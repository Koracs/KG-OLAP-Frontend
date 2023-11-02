"use server";

export const serverAction = async (query) => {
    try {
        const text = query.get("queryInput")?.valueOf();
        throw new Error("Query Endpoint not implemented");

    } catch (error) {
        return {
            error: error.message,
        }
    }
}