//import { createConnection } from "mysql";

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
exports.queryAll = function(userId, createTime, pageSize, callback) {
    mysql.talksAll(createTime, pageSize, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            mysql.favors(userId, function (err, favors) {
                if (err) {
                    ErrorCode.error0002.msg = err;
                    callback(ErrorCode.error0002, null);
                } else {
                    for (var i = 0; i < result.length; i++) {
                        var exist = favors.some(function (x) {return x.talk == result[i].id});
                        if (exist) {
                            result[i].favor = true;
                        }
                        else {
                            result[i].favor = false;
                        }
                    }
                    callback(null, result);
                }
            });
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

/**
 * add talk comment
 */
exports.addComment = function (talkId, userId, content, callback) {
    var uuid = utils.uuid();
    var createTime = utils.nowDate();
    mysql.addComment(uuid, talkId, userId, content, createTime, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            mysql.commentCount(talkId, function (err, result) {
                if (err) {
                    ErrorCode.error0002.msg = err;
                    callback(ErrorCode.error0002, null);
                } else {
                    var count = result[0].commentCount;
                    mysql.commentTalk(talkId, count, function (err, result) {
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

/**
 * add talk likes
 */
exports.addLikes = function (userId, talkId, callback) {
    //if exist
    mysql.existLikes(userId, talkId, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            if (result.length > 0) {
                callback(ErrorCode.error0012, null);
            } else {
                var uuid = utils.uuid();
                var createTime = utils.nowDate();
                //insert to the likes table
                mysql.addLikes(uuid, userId, talkId, createTime, function (err, result) {
                    if (err) {
                        ErrorCode.error0002.msg = err;
                        callback(ErrorCode.error0002, null);
                    } else {
                        //get the likes count of the talk
                        mysql.likesCount(talkId, function (err, result) {
                            if (err) {
                                ErrorCode.error0002.msg = err;
                                callback(ErrorCode.error0002, null);
                            } else {
                                var count = result[0].likesCount;
                                //update the likes count in the talk table
                                mysql.likesTalk(talkId, count, function (err, result) {
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

/**
 * get talk's comments
 */
exports.talkComments = function (talkId, createTime, pageSize, callback) {
    mysql.talkComments(talkId, createTime, pageSize, function (err, result) {
        if (err) {
            ErrorCode.error0002.msg = err;
            callback(ErrorCode.error0002, null);
        } else {
            callback(null, result);
        }
    });
};