import postApi from '../../apis/post'
import {createAction, handleActions} from 'redux-actions'
import {createPromiseAction, createFetchAction} from '../middlewares/redux-promise-action'

// ------ constant --------
const SET_NEW_POST_FETCH = 'SET_NEW_POST_FETCH'
const SET_POST_LIST_FETCH = 'SET_POST_LIST_FETCH'
const SET_POST_FETCH = 'SET_POST_FETCH'
const SET_DELETE_FETCH = 'SET_DELETE_FETCH'

const SET_EDITOR_TEXT = 'SET_EDITOR_TEXT'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'

// ----- actions --------
// it will auto dispatch(SET_NEW_POST_FETCH, result)
const requestAddNewPost = createPromiseAction(
  SET_NEW_POST_FETCH,
  postApi.sendNewPost,
  function onDispatch(dispatch, payload) {
    if (payload.fulfilled) {
      dispatch(addNewPost(payload.value))
      dispatch(setEditorText(''))
    }
  })

const requestDeletePost = createPromiseAction(
  SET_DELETE_FETCH,
  postApi.deletePost,
  (dispatch, payload) => {
    if (payload.fulfilled) {
      dispatch(deletePost(payload.value.id))
    }
  })

const fetchPosts = createFetchAction(SET_POST_LIST_FETCH, '/v1/post')
const fetchPost = createFetchAction(SET_POST_FETCH, (postId) => `/v1/post/${postId}`)
const addNewPost = createAction(ADD_POST)
const deletePost = createAction(DELETE_POST)
const setNewPost = createAction(SET_NEW_POST_FETCH)
const setEditorText = createAction(SET_EDITOR_TEXT)

export const actionCreators = {
  requestAddNewPost,
  requestDeletePost,
  fetchPosts,
  fetchPost,
  setEditorText,
  addNewPost,
  setNewPost
}

// ------ reducers ---------
const initialState = {
  editor: {text: ''},
  newPost: {},
  postsFetch: null,
  postFetch: null,
  posts: [],
  post: null
}

export default handleActions({
  [SET_EDITOR_TEXT]: (state, action) => ({
    ...state,
    editor: {
      ...state.editor,
      text: action.payload
    }
  }),
  [SET_POST_LIST_FETCH]: (state, action) => ({
    ...state,
    postsFetch: action.payload,
    posts: action.payload.fulfilled ? action.payload.value : state.posts
  }),
  [ADD_POST]: (state = {posts: []}, action) => ({
    ...state,
    posts: [action.payload, ...state.posts]
  }),
  [DELETE_POST]: (state = {posts: []}, action) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== action.payload)
  }),
  [SET_NEW_POST_FETCH]: (state, action) => ({
    ...state,
    newPost: action.payload
  }),
  [SET_POST_FETCH]: (state, action) => ({
    ...state,
    postFetch: action.payload,
    post: action.payload.fulfilled ? action.payload.value : state.post
  })
}, initialState)
