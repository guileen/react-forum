import postApi from '../../apis/post'
import {createAction, handleActions} from 'redux-actions'
import {createPromiseAction, createFetchAction} from '../middlewares/redux-promise-action'

// ------ constant --------
const SET_NEW_POST_FETCH = 'SET_NEW_POST_FETCH'
const SET_POST_LIST_FETCH = 'SET_POST_LIST_FETCH'
const SET_POST_FETCH = 'SET_POST_FETCH'
const SET_COMMENTS_FETCH = 'SET_COMMENTS_FETCH'

const SET_EDITOR_TEXT = 'SET_EDITOR_TEXT'
const ADD_POST = 'ADD_POST'

const SET_ADD_COMMENT_FETCH = 'SET_ADD_COMMENT_FETCH'
const SET_COMMENT_EDITOR_TEXT = 'SET_COMMENT_EDITOR_TEXT'
const ADD_COMMENT = 'ADD_COMMENT'

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

const fetchPosts = createFetchAction(SET_POST_LIST_FETCH, '/v1/post')
const fetchPost = createFetchAction(SET_POST_FETCH, (postId) => `/v1/post/${postId}`)
const fetchPostComments = createFetchAction(SET_COMMENTS_FETCH, (postId) => `/v1/post/${postId}/comments`)

const addNewPost = createAction(ADD_POST)
const setNewPost = createAction(SET_NEW_POST_FETCH)
const setEditorText = createAction(SET_EDITOR_TEXT)

const requestAddComment = createPromiseAction(SET_ADD_COMMENT_FETCH, postApi.addComment, (dispatch, payload) => {
  if (payload.fulfilled) {
    dispatch(addComment(payload.value))
    dispatch(setCommentEditorText(''))
  }
})
const addComment = createAction(ADD_COMMENT)
const setCommentEditorText = createAction(SET_COMMENT_EDITOR_TEXT)

export const actions = {
  requestAddNewPost,
  fetchPosts,
  fetchPost,
  requestAddComment,
  fetchPostComments,
  setCommentEditorText,
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
  addCommentFetch: null,
  commentsFetch: null,
  commentEditorText: '',
  posts: [],
  post: null,
  comments: []
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
  [SET_NEW_POST_FETCH]: (state, action) => ({
    ...state,
    newPost: action.payload
  }),
  [SET_POST_FETCH]: (state, action) => ({
    ...state,
    postFetch: action.payload,
    post: action.payload.fulfilled ? action.payload.value : state.post
  }),
  [SET_ADD_COMMENT_FETCH]: (state, action) => ({
    ...state,
    addCommentFetch: action.payload
  }),
  [SET_COMMENT_EDITOR_TEXT]: (state, action) => ({
    ...state,
    commentEditorText: action.payload
  }),
  [ADD_COMMENT]: (state = {comments: []}, action) => ({
    ...state,
    comments: [action.payload, ...state.comments]
  }),
  [SET_COMMENTS_FETCH]: (state, action) => ({
    ...state,
    commentsFetch: action.payload,
    comments: action.payload.fulfilled ? action.payload.value : state.comments
  })
}, initialState)
