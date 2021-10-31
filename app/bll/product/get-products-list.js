const Product = require('../../models/Product')

module.exports = async () => {
  const products = await Product.find().limit(20)

  return products.map(product => (
    {
      id         : product.id,
      title      : product.title,
      images     : product.images,
      category   : product.category,
      subcategory: product.subcategory,
      price      : product.price,
      description: product.description,
    }
  ))
}
