const { GenericValidator } = require('sito')

module.exports = class DbValidator extends GenericValidator {
  unique(model, attribute) {
    return this.check({
      message : (path, value) => `${path} '${value}' is not unique`,
      validate: async value => !await model.exists({ [attribute]: value }),
    })
  }
}
