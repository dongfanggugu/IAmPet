var UUID = require('uuid');
var crypto = require('crypto');

/**
 * UUID
 */
exports.uuid = function() {
    return UUID.v1();
}

/**
 * 清理json中null数据
 */
exports.delJsonNull = function(data) {
    for (var o in data) {
        if (null == data[o]) {
            delete data[o];
        }
    }
    return data;
}

/**
 * MD5
 */
exports.md5 = function(source) {
    var hash = crypto.createHash('md5');
    hash.update(source);
    return hash.digest('hex');
}

/**
 * get current date with format yyyy-MM-dd HH:mm:ss
 */
exports.nowDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}