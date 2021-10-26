const { Category, Product } = require('../../app/models/index')

const categoryData = {
  title        : 'Детские товары и игрушки',
  subcategories: [
    {
      title: 'Прогулки и детская комната',
    },
    {
      title: 'Кормление и гигиена',
    },
  ],
}

const productData = {
  title      : 'Коляска Adamex Barletta 2 in 1',
  description: 'Универсальная модель, которая с легкостью заменит родителям сразу две коляски',
  category   : 'Детские товары и игрушки',
  subcategory: 'Прогулки и детская комната',
  images     : [
    'http://magazilla.ru/jpg_zoom1/598194.jpg',
    'http://mzimg.com/big/o1/et0edczbio1.png',
    'http://mzimg.com/big/j1/et0ezrohaj1.jpg',
    'http://mzimg.com/big/k1/et0f0cmh9k1.jpg',
    'http://mzimg.com/big/h1/et0f0ijl1h1.jpg',
  ],
  price      : 21230,
  rating     : 4,
}

let categories

module.exports.createCategory = async () => {
  categories = await Category.create(categoryData)

  return categories
}

module.exports.createProduct = () => {
  return Product.create({
    ...productData,
    category   : categories.id,
    subcategory: categories.subcategories[0].id,
  })
}

module.exports.createBulkProducts = async numberOfProducts => {
  for (let i = 0; i < numberOfProducts; i++) {
    await Product.create({
      ...productData,
      category   : categories.id,
      subcategory: categories.subcategories[0].id,
    })
  }
}
