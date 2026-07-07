
import logger from "@infra/logging/logger";
import { redis } from "./redisOptions";
// Redis Configuration
export const redisConnect = () => {
    ;
    redis.on("connect", () => logger.info("✅ Redis connected successfully"));
    redis.on("error", (err: any) => logger.error("❌ Redis error:", err));
}
export default redisConnect;
