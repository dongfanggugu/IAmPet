var express = require('express');
var router = express.Router();
var section = require("../models/section");
var user = require("../models/user");
var utils = require('../utils/utils');
var multiparty = require('multiparty');
var path = require('path');
var fs = require("fs");
let multer = require('multer');

let uploadSingle = multer({
    dest: 'public/media/images'
});

var rspHead = {
    code : 1,
    msg : "successfully"
}

/**
 * 用户注册
 */
router.post('/register', function(req, res) {
    var body = req.body.body;
    user.register(body.userName, body.password, function(err, result) {
        var rsp = {};
        if (err) {
            rsp["head"] = err;
        } else {
            rsp["head"] = rspHead;
        }
        res.send(rsp);
    })
});

/**
 * 用户登录
 */
router.post('/login', function (req, res) {
    var body = req.body.body;
    console.log(body);
    user.login(body.userName, body.password, function (err, result) {
        var rsp = {};
        if (err) {
            rsp["head"] = err;
        } else {
            rsp["head"] = rspHead;
            rsp["body"] = utils.delJsonNull(result);
        }
        res.send(rsp);
    });
});

/**
 * 用户注销登录
 */
router.post('/logout', function (req, res) {
    var head = req.body.head;
    var body = req.body.body;
    var token = head.token;
    var userId = head.userId;
    user.logout(userId, token, function (err, result) {
        var rsp = {};
        if (err) {
            rsp["head"] = err;
        } else {
            rsp["head"] = rspHead;
        }
        res.send(rsp);
    }); 
});

router.get('/getSections', function (req, res) {
    section.sections(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

/**
 * 图片上传
 */
router.post('/image_upload', uploadSingle.single('logo'), function (req, res, next) {
    var file = req.file;
    console.log();
    var fileInfo = {};

    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;

    // 设置响应类型及编码
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });

    res.send(JSON.stringify(fileInfo));
});

/**
 * 添加版块
 */
router.get('/addSection', function(req, res) {
    var name = '找妈妈';
    var introduce = '我找不到家了，妈妈快点来找我'
    section.addSection(name, introduce, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/delSection', function(req, res) {
    var id = 'f0995de0-96c6-11e7-a445-42a369257f0c';
    section.delSection(id, function(err, result) {
        if (err) {
            res.send('delete 失败');
        } else {
            res.send('delete 成功');
        }
    });
});

router.post('/getSections', function (req, res) {
    console.log(req.body);

        var body = {
            name:'ok',
            id : 'sfssfsfsfsfs'
        };
        res.send(body);
    // var post = '';

    // req.on('data', function(data) {
    //     post += data;
    // });

    // req.on('end', function() {
    //     console.log(data);
    //     var body = {
    //         name:'ok',
    //         id : 'sfssfsfsfsfs'
    //     };
    //     req.send(body);
    // });
});

module.exports = router;