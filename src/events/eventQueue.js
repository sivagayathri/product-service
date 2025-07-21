const { Queue } = require("bullmq");
const { createClient } = require("redis");
require("dotenv").config();

const connection = createClient({ url: process.env.REDIS_URL });

const eventQueue = new Queue("product-events", {defaultJobOptions:retry,
  connection,
});

module.exports = eventQueue;
