import Provider from './provider'

export default class UserProvider extends Provider {
  constructor(db) {
    super(db, 'user', 'object')
  }
}
