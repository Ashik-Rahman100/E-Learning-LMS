require("dotenv").config();
import { Redis } from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Redis Connected`);
    return process.env.REDIS_URL;
  }
  throw new Error(`Redis connect Fail`);
};

export const redis = new Redis(redisClient());
