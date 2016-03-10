import postApi from '../../apis/post'
import {createAction, handleActions} from 'redux-actions'
import {createPromiseAction, createFetchAction} from '../middlewares/redux-promise-action'

// constant
const SET_COMMENTS_FETCH = 'SET_COMMENTS_FETCH'
const SET_ADD_COMMENT_FETCH = 'SET_ADD_COMMENT_FETCH'
const SET_COMMENT_EDITOR_TEXT = 'SET_COMMENT_EDITOR_TEXT'
const ADD_COMMENT = 'ADD_COMMENT'

// actionCreators
const fetchPostComments = createFetchAction(SET_COMMENTS_FETCH, (postId) => `/v1/post/${postId}/comments`)

const requestAddComment = createPromiseAction(SET_ADD_COMMENT_FETCH, postApi.addComment, (dispatch, payload) => {
  if (payload.fulfilled) {
    dispatch(addComment(payload.value))
    dispatch(setCommentEditorText(''))
  }
})
const addComment = createAction(ADD_COMMENT)
const setCommentEditorText = createAction(SET_COMMENT_EDITOR_TEXT)

export const actionCreators = {
  requestAddComment,
  fetchPostComments,
  setCommentEditorText
}

// reducers
const initialState = {
  addCommentFetch: null,
  commentsFetch: null,
  commentEditorText: '',
  comments: []
}

export default handleActions({
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
