/*
 *@Description 获取具体课程详情
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-10-11
 */
import config from '../config/config';
import safeRequest from '../libs/safeRequest';
export
default class CourseService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    handleAliber(digital) {
        let result = {
            unitid: undefined,
            typeid: undefined
        }
        const _online = digital.match(/online$/);
        const _offline = digital.match(/offline$/);

        if (_online) {
            result.unitid = config.alphaNumeric.indexOf(digital.substring(0, _online.index)) + 1;
            result.typeid = 0;
        }
        if (_offline) {
            result.unitid = config.alphaNumeric.indexOf(digital.substring(0, _offline.index)) + 1;
            result.typeid = 1;
        }
        console.log('课程处理结果', result);
        return result;
    }
    getCourseList(ckey) {
        const result = this.handleAliber(ckey);
        const data = {
            uid: this.ctx.session.userInfo.uid,
            class_id: 2, //班级ID，保留，默认填1或2即可
            unit_id: result['unitid'], //当前学习阶段ID，第一周对应1，第二周对应2，以此类推
            type_id: result['typeid'] //课程类型，0:线上视频，1:线下视频
        };
        const safeRequestIns = new safeRequest(this.ctx, config.getUnitCourseList, data);

        return safeRequestIns.request();
    }
};
