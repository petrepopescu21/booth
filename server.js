
var Koa = require('koa')
var Router = require('koa-router')
var Jimp = require('jimp')
var capture = require('./capture.js')

const app = new Koa()
const router = new Router()


router.get('/', async (ctx, next) => {
    console.log('Starting')
    await next()
    console.log('Done')
})


router.get('/', async (ctx) => {
    var message = await capture.many(3)
    console.log(message)
    ctx.body = '<html><body><img src="done/something.jpg"/></body></html>'
})

router.get('/image', async (ctx,next) => {
    ctx.state.images = {}
    for (i = 0; i < 3; i++) {
        console.log('Image number '+i)
        ctx.state.images[i] = await Jimp.read("./images/camera/"+i+".jpg")
        ctx.state.images[i].resize(591,392,Jimp.RESIZE_BICUBIC)
    }
    console.log('Creating empty image')
    await ctx.state.images.final = new Jimp(1181, 1772, 0xFFFFFFFF)
    console.log('Created image')
    await next()
    ctx.body = '<html><body><img src="done/something.jpg"/></body></html>'
})
router.get('/image', (ctx) => {
    console.log('Starting to collate')
    ctx.state.images.final.composite(ctx.state.images[0],0,0)
                          .composite(ctx.state.images[1],0,391)
                                .composite(ctx.state.images[2],0,782)
                                .composite(ctx.state.images[0],591,0)
                                .composite(ctx.state.images[1],591,391)
                                .composite(ctx.state.images[2],591,782)
                                .quality(100)
                                .contrast(0.2)
                                .normalize()
                                .write('./images/done/something.jpg')

})

app.use(router.routes()).use(router.allowedMethods())
app.use(require('koa-static')('images'));
app.listen(3000)
