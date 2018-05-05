'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localConfig = {
	"RDS_HOST": '192.168.0.33', //服务器IP
	"RDS_PWD": '123456', //密码
	"userLoginURL": 'http://test.yidengxuetang.com:8085/users/login',
	"ydWebUrl": "http://127.0.0.1:8085",
	"apiUrl": "http://192.168.0.32:8080/",
	"debug": true
}; //本地调试环境配置
exports.default = localConfig;