import {EntityProvider} from './provider'

export default class UserProvider extends EntityProvider {
  constructor(db) {
    super(db, 'user')
  }
}
