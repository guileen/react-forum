import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import header from './modules/header'

export default combineReducers({
  header,
  counter,
  router
})
