var mysql = require("../controllers/mysql");
var utils = require('../utils/utils');

exports.addSection = function(name, introduce, callback) {
    var id = utils.uuid();
    mysql.addSection(id, name, introduce, callback);
};

exports.sections = function(callback) {
    // mysql.sections(callback);

    mysql.varieties('d373a114-9435-11e7-b6c4-a0af8aa6a02f', callback);
}

/**
 * 删除版块
 */
exports.delSection = function(id, callback) {
    mysql.delSection(id, callback);
}
