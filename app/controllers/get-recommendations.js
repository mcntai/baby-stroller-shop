const getRecommendations = require('../bll/recommendation/get-recommendations')

module.exports = async ctx => {
  ctx.body = await getRecommendations()
}
