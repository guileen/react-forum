import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import header from './modules/header'
import user from './modules/user'

export default combineReducers({
  user,
  header,
  counter,
  router
})
