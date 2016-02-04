var levelup = require('levelup')
var wrapper = require('co-wrapper')

var dbOpts = global.dbOpts
var db = levelup(dbOpts)
module.exports = wrapper(db)
