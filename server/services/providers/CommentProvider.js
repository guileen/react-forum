import {CompositIdEntity} from './provider'

export default class CommentProvider extends CompositIdEntity {
  constructor(db) {
    super(db, 'comment', 'postId')
  }
}
