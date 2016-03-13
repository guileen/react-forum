import {EntityProvider} from './provider'

export default class CommentProvider extends EntityProvider {
  constructor(db) {
    super(db, 'comment')
  }

  async put(id, comment) {
    await super.put(id, comment)
    await this.bindOneToMany('post_comments', comment.postId, id)
  }

  async listOfPostId(postId, opt) {
    return await this.rangeOneToMany('post_comments', postId, opt)
  }
}
