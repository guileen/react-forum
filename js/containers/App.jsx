import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore'
// import Home from '../components/Home'
import DevTools from '../utils/devTools'
import routes from '../routes'
require('../../css/app.css')

const store = configureStore()


export default React.createClass({
  renderDevTools() {
    // only renders when running in DEV mode

    return __DEV__ ? <DevTools /> : null
  },

  render() {
    return (
      <div>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          <div>
            {routes}
            {this.renderDevTools()}
          </div>
        </Provider>
      </div>
    )
  }
})
