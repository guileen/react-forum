import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import header from './modules/header'
import user from './modules/user'
import post from './modules/post'

export default combineReducers({
  user,
  post,
  header,
  counter,
  router
})
