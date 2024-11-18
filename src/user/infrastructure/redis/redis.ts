import { createClient, RedisClientType } from "redis";
import "dotenv/config";

export let redisClient: RedisClientType | null = null;

export const connectRedis = async (): Promise<void> => {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URI as string });
  }

  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client is not connected.");
  }
  return redisClient;
};
