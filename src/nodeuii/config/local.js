//本地调试环境配置
import path from 'path';
const localConfig = {
	"RDS_HOST": '192.168.0.33', //服务器IP
	"RDS_PWD": '123456', //密码
	"userLoginURL": 'http://test.yidengxuetang.com:8085/users/login',
	"ydWebUrl": "http://127.0.0.1:8085",
	"apiUrl": "http://192.168.0.32:8080/",
	"debug": true
};
export
default localConfig;