const getCategories = require('../bll/getCategories')

module.exports = async ctx => {
  const categories = await getCategories()

  ctx.body = {
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
