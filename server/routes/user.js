import router from './router'
import {userProvider} from '../services/providers'

router.get('/user', async (ctx) => {
  if (!ctx.state.userId) {
    return ctx.throw('{"code": 401}', 401)
  }
  ctx.body = await userProvider.get(ctx.state.userId)
})

router.get('/user/:userId', async (ctx) => {
  ctx.body = await userProvider.get(ctx.params.userId)
})
