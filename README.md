# 🛒 Product Service

This is a **Product Microservice** built using **Express.js**, **MongoDB**, and **Redis Pub/Sub**, designed to work behind an **API Gateway** in a microservices architecture.

---

## 🚀 Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Messaging Broker**: Redis Pub/Sub (for inter-service communication)
- **Environment Management**: dotenv

---

## 📦 Features

- Product schema with fields: `name`, `product_id`, `price`, `stock`
- Internal-only microservice (not directly exposed to the frontend)
- Communicates with other services via Redis Pub/Sub
- Supports decoupled architecture via API Gateway

---

## 📁 Folder Structure

