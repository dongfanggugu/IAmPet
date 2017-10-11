var mysql = require("../controllers/mysql");
var utils = require('../utils/utils');
var errorCode = require('../utils/error_code');

/**
 * 用户注册
 */
exports.register = function (user, password, date, callback) {
    var userId = utils.uuid();
    mysql.addUser(userId, user, password, date, callback);
}

/**
 * 用户登录
 */
exports.login = function (userName, password, callback) {
    mysql.queryUsersByName(userName, function (err, result) {
        console.log('user name: ' + userName);
        console.log('password: ' + password);
        if (err) {
            callback(errorCode.error6002, null);
        } else {
            if (0 == result.length) {       //没有用户
                callback(errorCode.error1001, null);

            } else if (result.length > 1) {     //用户数大于1
                callback(errorCode.error6001, null);

            } else if (1 == result.length) {
                var userInfo = result[0];
                var pwd = userInfo.password;
                if (pwd != password) {  //密码错误
                    callback(errorCode.error1002, null);
                } else {
                    var token = utils.uuid();
                    mysql.addToken(userInfo.id, token, function (err, result) {
                        if (err) {
                            callback(errorCode.error6003, null);
                        } else {
                            userInfo["token"] = token;
                            callback(null, userInfo);
                        }
                    });
                }
            }
        }
    });
}

/**
 * 用户注销登录
 */
exports.logout = function (user, callback) {
    mysql.delToken(user, function (err, result) {
        if (err) {
            callback(errorCode.error6004, null);
        } else {
            callback(null, result);
        }
    });
}