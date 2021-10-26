const getRecommendations = require('../bll/getRecommendations')

module.exports = async ctx => {
  const recommendations = await getRecommendations()

  ctx.body = { recommendations }
}
