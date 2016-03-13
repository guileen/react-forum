import {userProvider, commentProvider} from './providers'

export const getLatest = (postId, cursor=0, limit=30) => {
  return commentProvider.listOfPostId(postId, {
    gte: cursor,
    reverse: true,
    limit: limit
  }).then(comments => {
    return Promise.all(comments.map(loadCommentCard))
  })
}

export const loadCommentCard = async (comment) => {
  comment.user = await userProvider.get(comment.userId)
  return comment
}

export default Object.assign({}, commentProvider, {
  getLatest,
  loadCommentCard
})
