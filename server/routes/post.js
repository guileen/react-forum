import router from './router'
import {requireLogin} from '../middleware/authorize'
import {postProvider} from '../services/providers'
import postService from '../services/postService'

router.post('/post', requireLogin, async (ctx) => {
  var body = ctx.request.body
  var post = {
    text: body.text,
    userId: ctx.state.userId
  }
  var id = await postProvider.insert(post)
  post.id = id
  await postService.getFullPost(post)
  ctx.body = post
})

router.get('/post', async (ctx) => {
  ctx.body = await postService.getLatest()
})
