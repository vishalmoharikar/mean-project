import { redis } from "./redis";

export const cacheGet = async (key: string) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
};

export const cacheSet = async (key: string, value: any) => {
    await redis.setex(key, 60, JSON.stringify(value)); // Cache for 60 seconds

};

export const cacheDeletePattern = async (pattern: string) => {
    const keys = await redis.keys(pattern);

    if (keys.length) {
        await redis.del(keys);
    }
};