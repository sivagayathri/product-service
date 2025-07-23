const { Queue } = require("bullmq");
const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("Redis Client Error", err));


(async () => {
  await redisClient.connect();
})();

const productQueue = new Queue("product-events", {
  connection: redisClient,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
  },
});

module.exports = productQueue;
