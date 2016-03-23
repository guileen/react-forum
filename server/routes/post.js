import router from './router'
import {requireLogin} from '../middleware/authorize'
import {postProvider, commentProvider, userProvider} from '../services/providers'
import {postService, commentService} from '../services'
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: false
})

router.post('/post', requireLogin, async (ctx) => {
  var body = ctx.request.body
  var post = {
    text: body.text,
    html: marked(body.text),
    userId: ctx.state.userId
  }
  if (body.files && body.files.length) {
    post.files = body.files
  }
  var id = await postProvider.insert(post)
  post.id = id
  await postService.loadPostCard(post)
  ctx.body = post
})

router.post('/post/delete', requireLogin, async (ctx) => {
  var id = ctx.request.body.id
  var post = await postProvider.get(id)
  if (Number(post.userId) !== ctx.state.userId) {
    ctx.throw(401)
    return
  }
  await postProvider.del(id)
  ctx.body = post
})

router.get('/post', async (ctx) => {
  ctx.body = await postService.getLatest()
})

router.get('/post/:id', async (ctx) => {
  var post = await postProvider.get(ctx.params.id)
  await postService.loadPostCard(post)
  ctx.body = post
})

router.post('/comment/', requireLogin, async (ctx) => {
  var {postId, text} = ctx.request.body
  var comment = {
    postId,
    text
  }
  comment.userId = ctx.state.userId
  comment.id = await commentProvider.insert(comment)
  comment.user = await userProvider.getDisplayUser(comment.userId)
  ctx.body = comment
})

router.get('/post/:id/comments', async (ctx) => {
  ctx.body = await commentService.getLatest(ctx.params.id)
})
