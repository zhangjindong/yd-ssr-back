// 设置插件默认配置
import cookie from "cookie";
import {
    Store
}
from "koa-session2";
import config from '../config/config';
const userLogin = config.userLoginURL;
export
default class loginValidate extends Store{
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }
    async get() {
        // const result = await this.ctx.redis.get('shiro_redis_session:fe5ef587-f883-4f77-8a3d-6e26369f83aa');
        // console.log('获取redis', result);
        const _hc = this.ctx.header.cookie || "";
        const cookies = cookie.parse(_hc);
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
                            this.ctx.redirect(config.ydWebUrl);
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
}