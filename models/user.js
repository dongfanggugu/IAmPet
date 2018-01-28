var mysql = require("../controllers/mysql");
var utils = require('../utils/utils');
var errorCode = require('../utils/error_code');

/**
 * 用户注册
 */
exports.register = function (user, password, callback) {
    var userId = utils.uuid();
    var date = utils.nowDate();
    //用户是否已经存在
    mysql.queryUsersByName(user, function(err, result) {
        if (err) {
            errorCode.error0002.msg = err;
            callback(errorCode.error0002, null);
        } else {
            if (result.length > 0) {
                callback(errorCode.error0003, null);
            } else {
                mysql.addUser(userId, user, password, date, function(err, result) {
                    if (err) {
                        errorCode.error0002.msg = err;
                        callback(errorCode.error0002, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        }
    });
}

/**
 * 用户登录
 */
exports.login = function (userName, password, callback) {
    mysql.queryUsersByName(userName, function (err, result) {
        if (err) {
            errorCode.error0002.msg = err;
            callback(errorCode.error0002, null);
        } else {
            if (0 == result.length) {       //没有用户
                callback(errorCode.error0004, null);
            } else if (result.length > 1) {     //用户数大于1
                callback(errorCode.error0006, null);
            } else if (1 == result.length) {
                var userInfo = result[0];
                var pwd = userInfo.password;
                if (pwd != password) {  //密码错误
                    callback(errorCode.error0005, null);
                } else {
                    //获取当前用户的是否已经登录
                    mysql.tokenByUser(userInfo.id, function(err, result) {
                        if (err) {
                            errorCode.error0002.msg = err;
                            callback(errorCode.error0002, null);
                        } else {
                            var token = utils.uuid();
                            if (result.length > 1) {
                                //返回错误
                                callback(errorCode.error0006, null);
                            } else if (1 == result.length) {
                                //更新用户token
                                mysql.updateUserToken(userInfo.userId, token, function (err, result) {
                                    if (err) {
                                        errorCode.error0002.msg = err;
                                        callback(errorCode.error0002, null);
                                    } else {
                                        userInfo["token"] = token;
                                        callback(null, userInfo);
                                    }
                                });
                            } else if (0 == result.length) {
                                mysql.addToken(userInfo.id, token, function (err, result) {
                                    if (err) {
                                        errorCode.error0002.msg = err;
                                        callback(errorCode.error0002, null);
                                    } else {
                                        userInfo["token"] = token;
                                        callback(null, userInfo);
                                    }
                                });
                            }
                        }
                    })
                }
            }
        }
    });
}

/**
 * 用户注销登录
 */
exports.logout = function (user, token, callback) {
    mysql.getUserByIdAndToken(user, token, function(err, result) {
        if (err) {
            errorCode.error0002.msg = err;
            callback(err, null);
        } else {
            if (0 == result.length) {   //用户已经注销
                callback(errorCode.error0009, null);
            } else {
                mysql.delToken(user, function (err, result) {
                    if (err) {
                        errorCode.error0002.msg = err;
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        }
    })
}

/**
 * 修改用户信息
 * @param {*} user 
 * @param {*} type 
 * @param {*} value 
 * @param {*} callback 
 */
exports.modifyUser = function (user, type, value, callback) {
    mysql.modiftyUserColumn(user, type, value, function(err, result) {
        if (err) {
            errorCode.error0002.msg = err;
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}