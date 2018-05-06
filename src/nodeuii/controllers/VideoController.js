
import { route, GET, POST, before } from 'awilix-koa';
import { createBundleRenderer } from 'vue-server-renderer';

const fs = require("fs");
const path = require("path");
const LRU = require('lru-cache');

import config from '../config/config';

const data = {
    title: "一灯学堂学员学习系统",
    content: "Hello World"
};
export default class VideoController {

    constructor({ courseService, examService }) {

        this.courseService = courseService;
        this.examService = examService;
        this.metaDictionaries = {
            "index": {
                title: "京程一灯",
                meta: '<meta name="keywords" content=京程一灯>'
            }
        }
    }
    // @route('/video')
    // @GET()
    getUser(ctx, next) {

        const result = data;
        ctx.body = { data: result };
    }
    createRenderer(serverbundle, template, clientManifest) {
        return createBundleRenderer(serverbundle, {
            cache: LRU({
                max: 10000
            }),
            runInNewContext: false,
            template,
            clientManifest
        });
    }
    // @route("/video/:action")
    // @GET()
    async index(ctx, next) {

        const examResult = await this.examService.getScoreList(ctx);


        const digital = await this.courseService.handleAliber(ctx.params.action);

        const actions = Number(digital.unitid)

        const _coursedata = await this.courseService.getCourseList(ctx,ctx.params.action);
        const courseKey = _coursedata.result.courselist


        for (let i = 0; i < courseKey.length; i++) {
            courseKey[i].key = i
            courseKey[i].keys = data[i]

        }
        if (actions >= 0) {
            var act
            if (actions > 0) {
                act = Number(actions) - 2
                console.log("看这把", act)
            }
            if (actions == 1) {
                if (_coursedata.result.title) {
                    ctx.body = await ctx.render('video/pages/video.html', {
                        title: "一灯学堂学员学习系统 - 预习课",
                        userinfo: ctx.session.userInfo.user_info,
                    });
                }
            } else if (examResult.result.scores[act] != undefined) {
                var score = examResult.result.scores[act].score
                if (score >= 80) {
                    if (_coursedata.result.title) {
                        ctx.body = await ctx.render('video/pages/video.html', {
                            title: "一灯学堂学员学习系统 - 预习课",
                            userinfo: ctx.session.userInfo.user_info,
                        });
                    }
                } else {
                    ctx.body = await ctx.render('error/pages/404.html', {});
                }
            }
        }
    }
    @route("/videoplayer/:action")
    @GET()
    async getData(ctx, next) {

        const _coursedata = await this.courseService.getCourseList(ctx, ctx.params.action);
        const courseKey = _coursedata.result.courselist
        
        for (let i = 0; i < courseKey.length; i++) {
            courseKey[i].key = i
            courseKey[i].keys = data[i]

        }
        if (_coursedata.result.title) {
            ctx.body = await {
                title: "一灯学堂学员学习系统 - 预习课",
                userinfo: ctx.session.userInfo.user_info,
                coursedata: _coursedata.result || {
                    courselist: []
                }
            };
        }
        // const rootPath = path.join(__dirname, '..');
        // const serverBundle = require('../assets/vue-ssr-server-bundle.json');
        // const clientManifest = require('../assets/vue-ssr-client-manifest.json');
        // const template = fs.readFileSync(rootPath + '/assets/index.html', 'utf-8');
        // const context = { url: ctx.url };
        // const ssrrender = this.createRenderer(serverBundle, template, clientManifest);

        // function createSsrStreamPromise() {
        //     return new Promise((resolve, reject) => {
        //         if (!ssrrender) {
        //             return ctx.body = 'waiting for compilation.. refresh in a moment.'
        //         }
        //         const ssrStream = ssrrender.renderToStream(context);
        //         ctx.status = 200;
        //         ctx.type = 'html';
        //         ssrStream.on('error', err => { reject(err) }).pipe(ctx.res);
        //     });
        // }
        // await createSsrStreamPromise(context);
    };
}
// export default VideoController;