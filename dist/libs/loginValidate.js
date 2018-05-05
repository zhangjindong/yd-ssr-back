"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _cookie = require("cookie");

var _cookie2 = _interopRequireDefault(_cookie);

var _koaSession = require("koa-session2");

var _config = require("../config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userLogin = _config2.default.userLoginURL; // 设置插件默认配置
let loginValidate = class loginValidate extends _koaSession.Store {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }
    async get() {
        // const result = await this.ctx.redis.get('shiro_redis_session:fe5ef587-f883-4f77-8a3d-6e26369f83aa');
        // console.log('获取redis', result);
        const _hc = this.ctx.header.cookie || "";
        const cookies = _cookie2.default.parse(_hc);
        const _yid = cookies['_yideng_sid'];
        let result = {
            uid: 0,
            user_info: {
                username: "",
                nick: "",
                role: "",
                avatar: "",
                description: ""
            }
        };
        if (_yid) {
            const res = await this.ctx.redis.get('shiro_redis_session:' + _yid + '');
            const _res = JSON.parse(res);
            if (_res) {
                if (_res.attributes.islogin) {
                    const _userrole = _res.attributes.user_info.role - 0;
                    switch (_userrole) {
                        case 1:
                        case 2:
                            result = _res.attributes;
                            break;
                        default:
                            this.ctx.redirect(_config2.default.ydWebUrl);
                            break;
                    }
                } else {
                    this.ctx.redirect(userLogin);
                }
            } else {
                this.ctx.redirect(userLogin);
            }
        } else {
            this.ctx.redirect(userLogin);
        }
        return result;
    }
};
exports.default = loginValidate;