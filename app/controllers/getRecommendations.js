const getRecommendations = require('../bll/getRecommendations')

module.exports = async ctx => {
  ctx.body = await getRecommendations()
}
