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