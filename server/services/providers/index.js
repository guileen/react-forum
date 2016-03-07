import UserProvider from './UserProvider'
import PostProvider from './PostProvider'
import CommentProvider from './CommentProvider'
import SessionProvider from './SessionProvider'
import OpenUserProvider from './OpenUserProvider'
import maindb from '../datasource/maindb'

export const userProvider = new UserProvider(maindb)
export const postProvider = new PostProvider(maindb)
export const commentProvider = new CommentProvider(maindb)
export const sessionProvider = new SessionProvider(maindb, userProvider)
export const openUserProvider = new OpenUserProvider(maindb, userProvider)
