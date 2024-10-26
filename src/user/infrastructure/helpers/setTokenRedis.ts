import { getRedisClient } from "../redis/redis";

export const setToken = async (token: string, uuid: string): Promise<void> => {
  const redisClient = getRedisClient();
  try {
    await redisClient.set(token, uuid, {EX: 86400});
  } catch (e: any) {
    console.error("Error setting token in Redis:", e);
    throw new Error("An error occurred while setting token.");
  }
};
