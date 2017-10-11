var express = require('express');
var router = express.Router();
var users = require("../models/user");
var querystring = require('querystring');
var url = require('url');
var utils = require('../utils/utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.get('/registerUser', function(req, res, next) {
  console.log("requeset url: " + req.originalUrl);
  res.sendStatus(200);
});

/**
 * 注册用户
 */
router.post('/registerUser', function(req, res) {
  console.log(req.body);
  var userName = req.body.userName;
  var pwd = req.body.password;
  users.register(userName, pwd, "", "", function(err, result) {
    
  });
});

router.post('/test', function(req, res) {
  console.log(req.body);
  var post = '';

  req.on('data', function(data) {
    post += data;
  });

  req.on('end', function() {
    console.log(post);
    res.send("ok");
  });
});

/**
 * 用户登录
 */
router.get('/login', function (req, res) {
  var params = url.parse(req.url);
  var query = querystring.parse(params.query);
  var userName = query.userName;
  var password = utils.md5(query.password);
  console.log(userName + "\n");
  console.log(password + "\n");

  users.login(userName, password, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send("登录成功");
    }
  });
});

module.exports = router;
