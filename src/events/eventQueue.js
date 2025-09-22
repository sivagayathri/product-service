// src/events/eventQueue.js
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

const productQueue = new Queue("product-events", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
  },
});

module.exports = { productQueue, connection };
