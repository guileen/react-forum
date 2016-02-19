const nodeEnv = process.env.NODE_ENV || 'development'
module.exports = require('./config.'+nodeEnv)
