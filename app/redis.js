import {createClient} from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
    console.error(error);
});

if(!redisClient.isOpen) {
    redisClient.connect();
}


export {redisClient};
