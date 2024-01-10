app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  // Map the orders to include the desired fields in the response
  const formattedOrders = orders.map(order => ({
    _id: order._id,
    product: order.product,
    quantity: order.quantity,
    orderDate: order.orderDate,
    customerName: order.customerName,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod, // Include the new field
    orderStatus: order.orderStatus, // Include the new field
  }));
  res.json(formattedOrders);
});
