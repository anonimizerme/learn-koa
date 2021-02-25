const http = require('http');
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {    
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {    
    const start = Date.now()
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
})

app.use(async ctx => {
    ctx.body = 'Hello world';
});


// 1. Run Koa application
// app.listen(3000);

// 2. Run via http
http.createServer(app.callback()).listen(3000);