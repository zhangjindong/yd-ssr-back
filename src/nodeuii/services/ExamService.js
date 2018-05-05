/*
 *@Description 获取考试接口
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
import config from '../config/config';
import safeRequest from '../libs/safeRequest';
export default class ExamService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getNotice() {
        const safeRequestIns = new safeRequest(this.ctx, config.getTgetLastNotice, {});
        return safeRequestIns.request();
    }
    getScoreList() {
        const data = {
            uid: this.ctx.session.userInfo.uid
        };
        const safeRequestIns = new safeRequest(this.ctx, config.getStudentScoreList, data);
        return safeRequestIns.request();
    }
};

