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