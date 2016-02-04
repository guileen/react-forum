import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import makeRoutes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

const routes = makeRoutes(store)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
