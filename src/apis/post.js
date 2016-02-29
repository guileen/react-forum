import fetchData, {postJson} from './fetchData'

export const sendNewPost = (payload) => postJson('/v1/post/', payload)
export const getList = (payload) => fetchData('/v1/post/', {query: payload})

export default {
  sendNewPost,
  getList
}
