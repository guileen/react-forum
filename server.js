const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

/* eslint-disable */
app.listen(3000, 'localhost', function(err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
/* eslint-enable */
