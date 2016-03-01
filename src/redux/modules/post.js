import postApi from '../../apis/post'
import {createAction, handleActions} from 'redux-actions'
import {createPromiseAction, createFetchAction} from '../middlewares/redux-promise-action'

// ------ constant --------
const ADD_NEW_POST = 'ADD_NEW_POST'
const SET_NEW_POST = 'SET_NEW_POST'
const SET_EDITOR_TEXT = 'SET_EDITOR_TEXT'
const SET_POST_LIST = 'SET_POST_LIST'

// ----- actions --------
// it will auto dispatch(SET_NEW_POST, result)
const requestAddNewPost = createPromiseAction(
  SET_NEW_POST,
  postApi.sendNewPost,
  function onDispatch(dispatch, payload) {
    if (payload.fulfilled) {
      dispatch(addNewPost(payload.value))
      dispatch(setEditorText(''))
    }
  })

const fetchPosts = createFetchAction(SET_POST_LIST, '/v1/post')

const addNewPost = createAction(ADD_NEW_POST)
const setNewPost = createAction(SET_NEW_POST)
const setEditorText = createAction(SET_EDITOR_TEXT)

export const actions = {
  fetchPosts,
  setEditorText,
  requestAddNewPost,
  addNewPost,
  setNewPost
}

// ------ reducers ---------
const initialState = {
  editor: {text: ''},
  newPost: {},
  postsFetch: null,
  posts: []
}

export default handleActions({
  [SET_EDITOR_TEXT]: (state, action) => ({
    ...state,
    editor: {
      ...state.editor,
      text: action.payload
    }
  }),
  [SET_POST_LIST]: (state, action) => ({
    ...state,
    postsFetch: action.payload,
    posts: action.payload.fulfilled ? action.payload.value : state.posts
  }),
  [ADD_NEW_POST]: (state = {posts: []}, action) => ({
    ...state,
    posts: [action.payload, ...state.posts]
  }),
  [SET_NEW_POST]: (state, action) => ({
    ...state,
    newPost: action.payload
  })
}, initialState)
