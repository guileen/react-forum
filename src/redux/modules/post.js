import postApi from '../../apis/post'
import {createAction, handleActions} from 'redux-actions'

// ------ constant --------
const ADD_NEW_POST = 'ADD_NEW_POST'
const SET_NEW_POST = 'SET_NEW_POST'

// ----- actions --------
// redux-thunk 会传入 dispatch 返回一个 Promise
// redux-promise 将 Promise 执行
// action creator, Function returns Function
const requestAddNewPost = (payload) => {
  const fn = async (dispatch) => {
    dispatch(setNewPost({pending: true}))
    try {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
      const result = await postApi.sendNewPost(payload)
      dispatch(setNewPost({fulfilled: true, value: result}))
      dispatch(addNewPost({payload: result}))
    } catch (e) {
      console.error(e)
      dispatch(setNewPost({rejected: true, reason: e.message}))
    }
  }
  return fn
}

const addNewPost = createAction(ADD_NEW_POST)
const setNewPost = createAction(SET_NEW_POST)

export const actions = {
  requestAddNewPost,
  addNewPost,
  setNewPost
}

// ------ reducers ---------
const initialState = {
  newPost: {},
  posts: []
}

export default handleActions({
  [ADD_NEW_POST]: (state = {posts: []}, action) => ({
    ...state,
    posts: [...state.posts, action.payload]
  }),
  [SET_NEW_POST]: (state, action) => ({
    ...state,
    newPost: action.payload
  })
}, initialState)
