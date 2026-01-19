import { createClient } from "redis";
import { envVariables } from "./env.config";

export const redisClient = createClient({
  username: envVariables.REDIS_USER_NAME,
  password: envVariables.REDIS_PASSWORD,
  socket: {
    host: envVariables.REDIS_HOST,
    port: Number(envVariables.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis redisClient Error", err));
const RedisConnect = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis client connected");
  }
};

export default RedisConnect;
