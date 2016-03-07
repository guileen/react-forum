import {userProvider, commentProvider} from './providers'

export const getLatest = (postId, cursor=0, limit=30) => {
  return commentProvider.rangeValues({
    gte: [postId, cursor],
    lte: [postId, '99999999999999999999'],
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
