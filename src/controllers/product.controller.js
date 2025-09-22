const express = require("express");
const Product = require("../models/product.model");
const productQueue = require("../events/eventQueue");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // Send event to Redis queue
    await productQueue.add("product.created", {
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      stock: product.stock,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
