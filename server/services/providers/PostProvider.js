import {EntityProvider} from './provider'

export default class PostProvider extends EntityProvider {
  constructor(db) {
    super(db, 'post')
  }
}
