import fetchData, {postJson} from './fetchData'

export const sendNewPost = (payload) => postJson('/v1/post/', payload)

export const deletePost = (id) => postJson('/v1/post/delete', {id: parseInt(id)})

export const getList = (payload) => fetchData('/v1/post/', {query: payload})

export const addComment = (payload) => postJson('/v1/comment/', payload)

export default {
  sendNewPost,
  deletePost,
  getList,
  addComment
}
