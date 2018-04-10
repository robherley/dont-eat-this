const Koa = require('koa');
const views = require('koa-views');
const consola = require('consola');
const app = new Koa();

app.on('error', err => {
   consola.error(err);
});

app.use(views(__dirname + '/views', { extension: 'pug' }));

let tidepoders = 0;
app.use(async ctx => {
   tidepoders++;
   console.log(ctx.request.ip);
   await ctx.render('index', { tidepoders });
});

const HOST = 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
   consola.info(`tidepods on ${HOST}:${PORT}`);
});
