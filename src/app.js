require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...', err));

// Routes
const productRoutes = require('./controllers/product.controller');
app.use('/product', productRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
