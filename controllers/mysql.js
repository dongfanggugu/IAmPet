var mysql = require('mysql');

var DATABASE = 'z_pet_talk';

var client;
function connetcion() {
    client = mysql.createConnection({
        host : 'www.chorstar.com',
        user: 'root',
        password: 'pingan365CXHZ',
    });
    client.connect();
    client.query('use ' + DATABASE);
};

connetcion();

/*********************************
 *********************************
 * 用户表操作 user
 ********************************
 ******************************** 
 */

/**
 * 根据用户名查询指定用户信息
 */
function queryUsersByName(userName, callback) {
    client.query(
        "select * from user where userName='" + userName + "'",
        callback 
    );
}
exports.queryUsersByName = queryUsersByName;

/**
 * 根据用户id查询制定用户信息
 */
function queryUsersById(userId, callback) {
    client.query(
        "select * from user where id='" + userId + "'",
        function queryCallback(err, result) {
            if (err) {
                throw err;
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
}
exports.queryUsersById = queryUsersById;

/**
 * 插入用户
 */
exports.addUser = function (id, userName, password, date, callback) {
        var user = {
            id: id,
            userName : userName,
            password : password,
            createTime : date
        };
        client.query(
            "insert into user set ?",
            user,
            callback
        );
}

/**
 * 更新用户信息
 */
exports.modifyUser = function (id, password, introduce, icon, petsName, ownerName, ownerTel, variety, voice) {
    var user = {};
    if (password) {
        user["password"] = password;
    }

    if (introduce) {
        user["introduce"] = introduce;
    }

    if (icon) {
        user["icon"] = icon;
    }

    if (petsName) {
        user["petsName"] = petsName;
    }

    if (ownerName) {
        user["ownerName"] = ownerName;
    }

    if (ownerTel) {
        user["ownerTel"] = ownerTel;
    }
    
    if (variety) {
        user["variety"] = variety;
    }

    if (voice) {
        user["voice"] = voice;
    }

    client.query(
        'update user set ? where id = ?',
        user,
        id,
        callback
    );
}

/*********************************
 *********************************
 * 版块表操作 section
 ********************************
 ******************************** 

 */
/**
 * 查询版块
 */
exports.sections = function (callback) {
    client.query(
        "select * from section",
        callback
    );
};

/**
 * 添加版块
 */
exports.addSection = function (id, name, introduce, callback) {
    var section = {
        id: id,
        name: name,
        introduce: introduce
    };
    client.query(
        'insert into section set ?',
        section,
        callback
    );
}

/**
* 删除版块
*/
exports.delSection = function (id, callback) {
    client.query(
        "delete from section where id='" + id + "'",
        callback
    );
}

/*********************************
 *********************************
 * 种类表操作 category
 ********************************
 ******************************** 
 */

/**
 * 查询种类
 */
exports.categories = function (callback) {
    client.query(
        'select * from category',
        callback
    );
}

/**
 * 添加种类
 */
exports.addCategory = function(id, name, content, callback) {
    var category = {
        id : id,
        name : name,
        content : content
    };

    client.query(
        'insert into category set ?',
        category,
        callback
    );
}

/**
 * 删除种类
 */
exports.delCategory = function(id, callback) {
    client.query(
        "delete from category where id='" + id + "'",
        callback
    );
}

/**
 * 修改种类名称和介绍
 */
exports.modifyCategoryName = function(id, name, introduce, callback) {
    var category= {};
    if (name) {
        category["name"] = name;
    }
    if (introduce) {
        category["introduce"] = introduce;
    }
    console.log(category);
    client.query(
        "update category set ? where id='" + id + "'",
        category,
        callback
    );
}
/*********************************
 *********************************
 * 品种表操作 varity
 ********************************
 ********************************
 */

/**
 * 根据种类id查询品种
 */
exports.varieties = function (category, callback) {
    client.query(
        "select * from variety where category=?",
        category,
        callback
    );
}

/**
 * 插入品种
 */
exports.addVariety = function (category, id, name, content, callback) {
    var variety = {
        id : id,
        category : category,
        name : name,
        content : content
    };

    client.query(
        "insert into variety set ?",
        variety,
        callback
    );
}

/**
 * 修改品种名称和说明
 */
exports.modifyCategoryName = function(id, name, content, callback) {
    var variety = {};
    if (name) {
        variety["name"] = name;
    }
    if (content) {
        variety["content"] = content;
    }
    client.query(
        "update variety set ? where id = ?",
        [variety, id],
        callback
    );
}

/*********************************
 *********************************
 * 内容表操作 talk 
 ********************************
 ********************************
 */

/**
 * 内容表查询，根据用户
 */

exports.talksWithUser = function (user, callback) {
    client.query(
        'select * from talk where user = ?',
        user,
        callback
    );
}

/**
 * 内容表内容插入
 */
exports.addTalk = function(id, user, content, pictures, voice, video, createTime, callback) {
    var talk = {
        id : id,
        user : user,
        content : content,
        createTime : createTime,
        pictures : pictures,
        voice : voice,
        video : video
    };

    client.query(
        "insert into talk set ?",
        talk,
        callback 
    );
}

/**
 * 喜欢内容
 */
exports.likeTalk = function (talk, callback) {
    client.query(
        'update talk set agree=agree+1 where id=?',
        talk,
        callback
    );
}

/*********************************
 *********************************
 * 评论表操作 comment 
 ********************************
 ********************************
 */
/**
 * 查询说说的评论按时间排序
 */
exports.comments = function (talk, callback) {
    client.query(
        'select * from comment where talk = ? order by createTime desc',
        talk,
        callback
    );
}

 /**
  * 对某条说说添加评论
  */
exports.addComment = function (id, talk, user, content, createTime, voice, callback) {
    var comment = {
        id : id,
        talk : talk,
        user : user,
        content : content,
        createTime : createTime,
        voice : voice
    };

    client.query(
        'insert into comment set ?',
        comment,
        callback
    );
}

/*********************************
 *********************************
 * 收藏表操作 favor
 ********************************
 ********************************
 */

 /**
  * 查询用户收藏
  */
exports.favors = function (user, callback) {
    client.query(
        'select * from favor where user = ?',
        user,
        callback
    );
}

/**
 * 用户添加收藏
 */
exports.addFavor = function (user, talk, callback) {
    var favor = {
        user : user,
        talk : talk
    };

    client.query(
        'insert into favor set ?',
        favor,
        function (err, result) {
            if (err) {
                throw err;
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
}

/*********************************
 *********************************
 * token表操作 token
 ********************************
 ******************************** 
 */

 /**
  * 获取用户token
  */
function tokenByUser(user, callback) {
    client.query(
        'select * from token where user=?',
        user,
        callback
    ); 
}
exports.tokenByUser = tokenByUser;

/**
 * 根据token和userId查询用户
 */
function getUserByIdAndToken(userId, token, callback) {
    client.query(
        'select * from token where user=? and token=?',
        [userId, token],
        callback
    );
}
exports.getUserByIdAndToken = getUserByIdAndToken;

/**
 * 插入用户token
 */
exports.addToken = function (user, token, callback) {
    var tokenValue = {
        user: user,
        token: token
    };
    client.query(
        'insert into token set ?',
        tokenValue,
        callback
    );
}

/**
 * 更新token表内容
 */
exports.updateUserToken = function (user, token, callback) {
    var tokenValue = {
        token : token
    };
    client.query(
        "update token set ? where user = ?",
        [tokenValue, user],
        callback
    );
}

/**
 * 删除用户token
 */
exports.delToken = function (user, callback) {
    client.query(
        'delete from token where user = ?',
        user,
        callback
    );
}