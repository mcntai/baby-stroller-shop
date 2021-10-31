const getCategories = require('../bll/category/get-categories')

module.exports = async ctx => {
  ctx.body = await getCategories()
}
