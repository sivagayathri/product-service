require('dotenv').config();
const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const Product = require('../models/product.model');
const { productQueue, connection } = require('../events/eventQueue');

// MongoDB connection
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log('Worker connected to MongoDB'))
  .catch(err => console.error('Worker MongoDB connection error:', err));

const worker = new Worker(
  'product-events',
  async (job) => {

    if (job.name === 'add-stock') {
  
      const { sku, name, price, stock ,category,description} = job.data;

      let product = await Product.findOne({ sku });

      if (!product) {
        product = await Product.create({ sku, name, price, stock,category,description });
        await productQueue.add('stock_added', { sku, stock: product.stock });
    
      } else {
        product.stock += stock;
        await product.save();
        await productQueue.add('stock_updated', { sku, newStock: product.stock });
      
      }
    }
    
    if (job.name === 'decrease-stock') {
  
    const { productId, quantity } = job.data;

    const product = await Product.findOne({ sku: productId });

    if (!product) throw new Error(`Product with SKU ${productId} not found`);

    if (product.stock < quantity) {
      throw new Error(`Not enough stock for SKU ${productId}`);
    }

    product.stock -= quantity;
    await product.save();

    await productQueue.add('stock_decreased', { sku: productId, newStock: product.stock });

    console.log(`Stock decreased for SKU ${productId}, new stock: ${product.stock}`);
}


  },
  { connection } 
);

worker.on('completed', (job) => console.log(`Job ${job.id} processed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err.message));
