import {userProvider, postProvider} from './providers'

// default params not working with async with babel
export const getLatest = (cursor=0, limit=30) => {
  return Promise.resolve(postProvider.rangeValues({
    gte: '' + cursor,
    lte: '99999999999999999999',
    reverse: true,
    limit: limit
  })).then((posts) => {
    return posts
  })
}

export default Object.assign({}, postProvider, {getLatest})
