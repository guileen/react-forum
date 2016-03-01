import {createAction, handleActions} from 'redux-actions'
import {createFetchAction} from '../middlewares/redux-promise-action'

// Constants
export const LOAD_LOGIN_USER = 'LOAD_LOGIN_USER'
export const SET_LOGIN_USER = 'SET_LOGIN_USER'

export const actions = {
  // loadLoginUser: createPromiseAction(SET_LOGIN_USER, userApi.show)
  loadLoginUser: createFetchAction(SET_LOGIN_USER, '/v1/user'),
  setLoginUser: createAction(SET_LOGIN_USER)
}

export const reducers = handleActions({
  [SET_LOGIN_USER]: (state = {loginUser: null}, action) => ({
    ...state,
    loginUser: action.payload
  })
}, {loginUser: null})

export default reducers
