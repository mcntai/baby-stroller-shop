const Product = require('../models/Product')

module.exports = async () => {
  const recommendations = await Product.find().limit(6)

  return {
    recommendations: recommendations.map(product => (
      {
        id         : product.id,
        title      : product.title,
        images     : product.images,
        category   : product.category,
        subcategory: product.subcategory,
        price      : product.price,
        description: product.description,
      }
    )),
  }
}
