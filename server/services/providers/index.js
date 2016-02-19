import UserProvider from './UserProvider'
import PostProvider from './PostProvider'
import maindb from '../datasource/maindb'

export const userProvider = new UserProvider(maindb)
export const postProvider = new PostProvider(maindb)
