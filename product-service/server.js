app.get('/products', async (req, res) => {
  const products = await Product.find();
  // Map the products to include the desired fields in the response
  const formattedProducts = products.map(product => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    stockQuantity: product.stockQuantity,
    manufacturer: product.manufacturer,
    imageUrl: product.imageUrl,
    releaseDate: product.releaseDate, // Include the new field
    ratings: product.ratings, // Include the new field
  }));
  res.json(formattedProducts);
});
