const getCategories = require('../bll/getCategories')

module.exports = async ctx => {
  ctx.body = await getCategories()
}
