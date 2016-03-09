import fs from 'fs-extra'
import _debug from 'debug'
import webpackCompiler from '../build/webpack-compiler'
import webpackConfig from '../build/webpack.config'
import config from '../config'

const debug = _debug('app:bin:compile')
const paths = config.utils_paths
const staticHost = config.static_host || ''

;(async function () {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler(webpackConfig)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Copy static assets to dist folder.')
    fs.copySync(paths.client('static'), paths.dist())
    const originIndexHtml = fs.readFileSync(paths.dist() + '/index.html', 'utf-8')
    const indexHtml = originIndexHtml.replace(/(src|href)="([a-zA-Z0-9.]*)"/g, `$1="${staticHost}\/$2"`)
    fs.writeFileSync(paths.dist() + '/index.html', indexHtml)
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
