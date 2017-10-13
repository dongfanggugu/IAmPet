var express = require('express');
var router = express.Router();
var section = require("../models/section");
var user = require("../models/user");
var utils = require('../utils/utils');
var path = require('path');
let multer = require('multer');
let media = require('../models/media');
var config = require('../config'); 

let uploadSingle = multer({
    dest: 'tmp'
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
 * 文件上传
 */
router.post('/fileUpload', uploadSingle.single('file'), function (req, res, next) {
    var file = req.file;
    media.storageFile(file, function(err, result) {
        var rsp = {};
        if (err) {
            rsp.head = err;
        } else {
            rsp.head = rspHead;
            var url = "http://" + req.hostname + ":" + config.port + "/" + result;
            rsp.body = {url: url};
        }
        res.send(rsp);
    });
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