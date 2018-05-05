/*
 *@Description基础请求类
 *@Date 2015-04-06
 *@Author yuanzhijia@jikexueyuan.com
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SafeRequest = class SafeRequest {
    constructor(ctx, url, data) {
        this.ctx = ctx;
        this.url = url;
        this.data = data;
    }
    request() {
        const rpOptions = {
            method: 'POST',
            uri: _config2.default.apiUrl + this.url,
            form: {
                params: JSON.stringify(this.data)
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                // Set automatically 
            }
            //json: true // Automatically stringifies the body to JSON 
        };
        return new Promise((resolve, reject) => {
            (async () => {
                await (0, _requestPromise2.default)(rpOptions).then(function (result) {
                    const resp = JSON.parse(result);
                    //console.log('纯输出结果', resp);
                    if (resp) {
                        if (resp.error_code == 0) {
                            resolve({
                                error_code: 0,
                                result: resp.result
                            });
                        } else {
                            resolve({
                                error_code: 1,
                                result: resp.msg
                            });
                        }
                    } else {
                        resolve({
                            error_code: 1,
                            result: 'Fail to parse http response'
                        });
                    }
                }).catch(function (err) {
                    reject({
                        error_code: 1,
                        result: err
                    });
                });
            })();
        });
    }
};
exports.default = SafeRequest;
;