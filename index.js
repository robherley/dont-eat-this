const Koa = require('koa');
const views = require('koa-views');
const consola = require('consola');
const axios = require('axios');
const app = new Koa();
require('dotenv').config();

app.on('error', err => {
   consola.error(err);
});

app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', { extension: 'pug' }));

app.use(async (ctx, next) => {
   const { ip } = ctx.request;
   let { data } = await axios.get(process.env.ENDPOINT);
   if (data.result.indexOf(ip) === -1) {
      data.result = [ip, ...data.result];
      await axios.post(process.env.ENDPOINT, data.result);
   }
   ctx.state.tidepoders = data.result.length;
   await next();
});

app.use(async ctx => {
   const { tidepoders } = ctx.state;
   await ctx.render('pods', { tidepoders });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   consola.info(`tidepods on :${PORT}`);
});
