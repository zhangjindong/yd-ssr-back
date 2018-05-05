'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
    //默认生产环境
    "env": "development",
    //端口号配置
    "port": 8000,
    //模板所在的目录
    "webpackConf": _path2.default.join(__dirname, "../..", "config/webpack.dev.js"),
    "viewDir": _path2.default.join(__dirname, '..', 'views'),
    //log所在的目录
    "logDir": _path2.default.join(__dirname, '..', 'logs'),
    //静态文件所在的目录
    "staticDir": _path2.default.join(__dirname, '..'),
    //获取考试信息数据
    "getUnitCourseList": "StudyCenterService/CurriculumREST/getUnitCourseList",
    //获取学员分数已遍通关
    "getStudentScoreList": "StudyCenterService/ExaminationREST/getStudentScoreList",
    //获取实战要求和视频
    "getTaskDetail": "StudyCenterService/ActualMissionREST/getMissionInfo",
    //获取公告接口信息那天
    "getTgetLastNotice": "StudyCenterService/NoticeREST/getLastNotice",
    //高端班课程图标
    advancedClassIcon: ["js", "node", "engineering", "performance", "css", "mvvm", "circuit", "algorithm", "graphics", "safe", "bat"],
    //基础班课程图标
    basicsClassIcon: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16"],
    //基础班考试paperids
    basicsPaperids: [""],
    //高端班考试paperids
    advancedPaperids: ["QDE4SW", "62SZ1T", "UKVGGX", "QXDB2Y", "2BD8KX", "USGPUQ", "2RWKHT", "", "2R1OJX", ""],
    //xi班课程总数
    basicsNumber: 16,
    //高端班课程总数
    advancedNumber: 10,
    alphaNumeric: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"],
    aliberDigital: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
    //技能
    "LearningSkills": "/StudyCenterService/basic/skills",
    //城市
    "forwardCity": "/StudyCenterService/basic/place",
    //薪资
    "salary": "/StudyCenterService/basic/salary",
    //hr
    "hrjob": "/StudyCenterService/hr/getJobList",
    //设置学员求职意向数据详情
    "studentDetails": "/StudyCenterService/student/setIntention",
    //获取学员求职意向数据详情
    "getStudentsInterested": "/StudyCenterService/student/getIntention"

}; //应用配置文件

const server = {
    "RDS_PORT": 6379, //端口号
    "RDS_HOST": '6f814adbdbbc436c.m.cnbja.kvstore.aliyuncs.com', //服务器IP
    "RDS_PWD": 'YD2016Radis', //密码
    "userLoginURL": 'http://test.yidengxuetang.com:8085/users/login',
    "ydWebUrl": "http://test.yidengxuetang.com",
    "apiUrl": "http://101.200.216.170:8080/"
};
//当NODE_ENV环境变量值为local时
//本地调试环境
const NODE_ENV = "development"; //production
if (NODE_ENV === 'development') {
    config = _lodash2.default.extend(config, _local2.default);
} else {
    config = _lodash2.default.extend(config, server);
}
exports.default = config;