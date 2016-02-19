import Provider from './provider'

export default class PostProvider extends Provider {
  constructor(db) {
    super(db, 'post', 'object')
  }
}
