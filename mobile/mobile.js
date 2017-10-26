var express = require('express');
var router = express.Router();
var section = require("../models/section");
var user = require("../models/user");
var talk = require('../models/talk');
var utils = require('../utils/utils');
var path = require('path');
var multer = require('multer');
var media = require('../models/media');
var config = require('../config'); 

var uploadSingle = multer({
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
 * 说说发布
 */
router.post('/publish', function(req, res) {
    var head = req.body.head;
    var body = req.body.body;
    var userId = head.userId;
    talk.insert(userId, body.content, body.pictures, body.voice, body.video, function(err, result) {
        var rsp = {};
        if (err) {
            rsp.head = err;
        } else {
            rsp.head = rspHead;
        }
        res.send(rsp);
    });
});

/**
 * 根据userId获取说说
 */
router.post('/talksWithUserId', function(req, res) {
    console.log(req.body);
    var head = req.body.head;
    var body = req.body.body;
    var userId = head.userId;
    var createTime = "";
    if (body != undefined)
    {
        createTime = body.createTime;
    }

    var pageSize = 10;
    talk.query(userId, createTime, pageSize, function(err, result) {
        var rsp = {};
        if (err) {
            rsp.head = err;
        } else {
            rsp.head = rspHead;
            rsp.body = utils.delJsonNull(result);
        }
        res.send(rsp);
    });
});





module.exports = router;