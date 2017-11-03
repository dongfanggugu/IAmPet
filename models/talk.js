var mysql = require("../controllers/mysql");
var utils = require('../utils/utils');
var ErrorCode = require('../utils/error_code');

/**
 * insert talk
 */
exports.insert = function (userId, content, pictures, voice, video, callback) {
    var id = utils.uuid();
    var createTime = utils.nowDate();
    mysql.addTalk(id, userId, content, pictures, voice, video, createTime, function(err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            callback(null, result);
        }
    });
}

/**
 * query all the talks
 */
exports.queryAll = function(createTime, pageSize, callback) {
    mysql.talksAll(createTime, pageSize, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            callback(null, result);
        }
    });
};

/**
 * query the talks with the userId 
 */
exports.query = function(userId, createTime, pageSize, callback) {
    mysql.talksWithUser(userId, createTime, pageSize, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            callback(null, result);
        }
    });
};

/**
 * favor the talk
 */
exports.addFavor = function (userId, talk, callback) {
    mysql.favorExist(userId, talk, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            //already exist
            if (result.length > 0) {
                callback(ErrorCode.error0011, null);
            } else {
                var uuid = utils.uuid();
                var createTime = utils.nowDate();
                mysql.addFavor(uuid, userId, talk, createTime, function (err, result) {
                    if (err) {
                        ErrorCode.error0002.msg = err;
                        callback(ErrorCode.error0002, null);
                    } else {
                        //获取当前数量
                        mysql.favorCount(talk, function (err, result) {
                            if (err) {
                                ErrorCode.error0002.msg = err;
                                callback(ErrorCode.error0002, null);
                            } else {
                                var count = result[0].favorCount;
                                //更新收藏数量
                                mysql.favorTalk(talk, count, function (err, result) {
                                    if (err) {
                                        ErrorCode.error0002.msg = err;
                                        callback(ErrorCode.error0002, null);
                                    } else {
                                        callback(null, result);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}
