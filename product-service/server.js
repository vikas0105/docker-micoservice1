const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://mongo:27017/productsdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

// Product model
const Product = require('./models/Product');

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/products', async (req, res) => {
  const { name, price, description, category, stockQuantity, manufacturer, imageUrl, releaseDate, ratings } = req.body;
  const product = new Product({ name, price, description, category, stockQuantity, manufacturer, imageUrl, releaseDate, ratings });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Additional routes and configurations go here

const port = 3001;
app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
