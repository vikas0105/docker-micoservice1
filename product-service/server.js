const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

mongoose.connect('mongodb://product-db/products', { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', { name: String, price: Number });

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Product Service');
});

// Health check route
app.get('/health', (req, res) => {
  res.send('Product Service is healthy');
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  await product.save();
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
