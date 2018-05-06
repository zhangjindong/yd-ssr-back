"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _loginValidate = require("./libs/loginValidate");

var _loginValidate2 = _interopRequireDefault(_loginValidate);

var _koaSession = require("koa-session2");

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaConvert = require("koa-convert");

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaRedisPool = require("koa-redis-pool");

var _koaRedisPool2 = _interopRequireDefault(_koaRedisPool);

var _config3 = require("./config/config");

var _config4 = _interopRequireDefault(_config3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { createContainer, Lifetime } = require('awilix');
const { loadControllers, scopePerRequest } = require('awilix-koa');
const app = new _koa2.default();

/** new ssr start */
//koa1 转换器


const RDS_PORT = _config4.default.RDS_PORT; //端口号
const RDS_HOST = _config4.default.RDS_HOST; //服务器IP
const RDS_PWD = _config4.default.RDS_PWD; //密码

app.use((0, _koaConvert2.default)((0, _koaRedisPool2.default)({
    host: RDS_HOST,
    port: RDS_PORT,
    max: 75,
    min: 1,
    timeout: 3000,
    log: false,
    password: RDS_PWD,
    db: 0
})));

app.use((0, _koaSession2.default)({
    key: "_yideng_learnid" //default "koa:sess"
}));

app.use(async (ctx, next) => {
    //注入session
    const redisResult = new _loginValidate2.default(ctx).get();

    await redisResult.then(res => {
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
_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
//此处除了配置config开发阶段还有/__webpack_hmr
const config = (0, _config2.default)(app);
const logger = _log4js2.default.getLogger('cheese');
_errorHandler2.default.error(app, logger);
//注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));
app.use((0, _koaStatic2.default)(config.staticDir)); // 静态资源文件


app.listen(config.port, () => {
    console.log(`ydSystem listening on ${config.port}`);
});
// asdf
module.exports = app;