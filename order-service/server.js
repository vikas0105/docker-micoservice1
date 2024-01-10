const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://mongo:27017/ordersdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

// Order model
const Order = require('./models/Order');

// Routes
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/orders', async (req, res) => {
  const { product, quantity, customerName, shippingAddress, paymentMethod, orderStatus } = req.body;
  const order = new Order({ product, quantity, customerName, shippingAddress, paymentMethod, orderStatus });
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Additional routes and configurations go here

const port = 3002;
app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
