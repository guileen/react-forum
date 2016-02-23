import userApi from '../../apis/user'
import {createAction, handleActions} from 'redux-actions'
// Constants
export const LOAD_LOGIN_USER = 'LOAD_LOGIN_USER'

export const actions = {
  loadLoginUser: createAction(LOAD_LOGIN_USER, userApi.show)
}

export const reducers = handleActions({
  [LOAD_LOGIN_USER]: (state = {loginUser: null}, action) => ({
    ...state,
    loginUser: action.payload
  })
}, {loginUser: null})

export default reducers
