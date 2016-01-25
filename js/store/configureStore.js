import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {persistState} from 'redux-devtools'
import * as reducers from '../reducers/index'
import DevTools from '../utils/devTools'

let createStoreWithMiddleware

const middleware = [thunkMiddleware]
// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
}

const rootReducer = combineReducers(reducers)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
