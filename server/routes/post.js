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
  ctx.body = post
})

router.get('/post', async (ctx) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
  })
  ctx.body = await postService.getLatest()
})
