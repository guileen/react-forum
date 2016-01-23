import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore'
// import Home from '../components/Home'
import {renderDevTools} from '../utils/devTools'
import routes from '../routes'

const store = configureStore()

export default React.createClass({
  render() {
    return (
      <div>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          {routes}
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    )
  }
})
