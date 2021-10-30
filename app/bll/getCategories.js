const Category = require('../models/Category')

module.exports = async () => {
  const categories = await Category.find()

  return {
    categories: categories.map(category => (
      {
        id           : category.id,
        title        : category.title,
        subcategories: category.subcategories.map(subcategory => ({
          id   : subcategory.id,
          title: subcategory.title,
        })),
      }
    )),
  }
}
