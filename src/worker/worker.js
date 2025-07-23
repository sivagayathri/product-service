require("dotenv").config();
const { Worker } = require("bullmq");
const { createClient } = require("redis");

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();

  const worker = new Worker(
    "product-events",
    async (job) => {
      if (job.name === "product.created") {
        const data = job.data;
        console.log("Product Created Event Received:", data);
      }
    },
    { connection: redisClient }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} processed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
  });
})();
