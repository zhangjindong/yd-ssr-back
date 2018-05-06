import Koa from "koa";
import serve from "koa-static";
import log4js from 'log4js';
import configure from "./config";
import co from 'co';
import errorHandler from "./middlewares/errorHandler";
const { createContainer, Lifetime } = require('awilix');
const { loadControllers, scopePerRequest } = require('awilix-koa');
const app = new Koa();

/** new ssr start */
import Store from './libs/loginValidate';
import session from 'koa-session2';
import convert from 'koa-convert'; //koa1 转换器
import redisPool from "koa-redis-pool";
import redisConfig from "./config/config";

const RDS_PORT = redisConfig.RDS_PORT; //端口号
const RDS_HOST = redisConfig.RDS_HOST; //服务器IP
const RDS_PWD = redisConfig.RDS_PWD; //密码

app.use(convert(redisPool({
    host: RDS_HOST,
    port: RDS_PORT,
    max: 75,
    min: 1,
    timeout: 3000,
    log: false,
    password: RDS_PWD,
    db: 0
})));

app.use(session({
    key: "_yideng_learnid", //default "koa:sess"
}));

app.use(async(ctx, next) => {
    //注入session
    const redisResult = (new Store(ctx)).get();

    await redisResult.then((res) => {
        ctx.session.userInfo = res;
    });
    await next();
});
/** new ssr end */

//创建IOC的容器
const container = createContainer();
//每一次的请求都是一个 new model

app.use(scopePerRequest(container));
//装载所有的models 并将services代码注入到controllers
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
});
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
//此处除了配置config开发阶段还有/__webpack_hmr
const config = configure(app);
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
//注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));
app.use(serve(config.staticDir)); // 静态资源文件


app.listen(config.port, () => {
    console.log(`ydSystem listening on ${config.port}`);
});
// asdf
module.exports = app;
