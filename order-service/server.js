const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

mongoose.connect('mongodb://order-db/orders', { useNewUrlParser: true, useUnifiedTopology: true });

const Order = mongoose.model('Order', { product: String, quantity: Number });

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Order Service');
});

// Health check route
app.get('/health', (req, res) => {
  res.send('Order Service is healthy');
});

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { product, quantity } = req.body;
  const order = new Order({ product, quantity });
  await order.save();
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
