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


    var strHour = date.getHours();
    if (strHour >= 1 && strHour <= 9) {
        strHour = "0" + strHour;
    }

    var strMin = date.getMinutes();
    var strMin = date.getMinutes();
    var strMin = date.getMinutes();
    var strMin = date.getMinutes();
    if (strMin >= 1 && strMin <= 9) {
        strMin = "0" + strMin;
    }

    var strSecond = date.getSeconds();
    if (strSecond >= 1 && strSecond <= 9) {
        strSecond = "0" + strSecond;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + strHour + seperator2 + strMin + seperator2 + strSecond;
    return currentdate;
}