import { route, GET, POST, before } from 'awilix-koa';
@route("/users")
export default class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }
    // 路由 users 123
    // @route("/:id")
    // @GET()
    // async getUser(ctx, next) {
    //     const result = await this.userService.getData(ctx.params.id);
    //     ctx.body = { data: result };
    // }

    @route('/getUserInfo')
     @GET()
     async getUserInfo(ctx, next) {

        ctx.body = ctx.session.userInfo.user_info;
    }
}
