import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import header from './modules/header'
import user from './modules/user'
import post from './modules/post'
import comment from './modules/comment'

export default combineReducers({
  user,
  post,
  comment,
  header,
  counter,
  router
})
