const assert = require('assert')
const connection = require('../app/libs/connection')

global.assert = assert

exports.mochaHooks = {
  beforeEach: function () {

  },
  afterAll  : function () {
    return connection.close()
  },
}
