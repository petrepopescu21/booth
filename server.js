
var Koa = require('koa')
var Router = require('koa-router')

var capture = require('./capture.js')

const app = new Koa()
const router = new Router()


router.get('/', async (ctx,next)=>{
    console.log('Starting')
    await next()
    console.log('Done')
})


router.get('/', async (ctx)=>{
    var message = await capture.many(3)
    console.log(message)
    ctx.body = 'done'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
