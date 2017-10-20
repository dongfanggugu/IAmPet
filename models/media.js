var errorCode = require('../utils/error_code');
var fs = require("fs");

var mediaPath = "public/media/";

exports.storageFile = function(file, callback) {
    var mimetype = file.mimetype.split("/");
    var mime = mimetype[0];

    var path = file.path;
    var fileName = file.originalname;
    if (mime == "image") {
        var des = mediaPath + "images/" + Date.now() + ".jpg";
        fs.rename(file.path, des, function (err) {
            if (err) {
                errorCode.error0002.msg = err;
                callback(error0002, null);
            } else {
                des = des.replace(/public\//, '');
                callback(null, des);
            }
        });
    } else if (mime == "video") {
        var des = mediaPath + "videos/" + Date.now() + ".mp4";
        fs.rename(file.path, des, function (err) {
            if (err) {
                errorCode.error0002.msg = err;
                callback(error0002, null);
            } else {
                des = des.replace(/public\//, '');
                callback(null, des);
            }
        }); 
    } else if (mime == "audio") {
        var des = mediaPath + "audios/" + Date.now() + ".mp3";
        fs.rename(file.path, des, function (err) {
            if (err) {
                errorCode.error0002.msg = err;
                callback(error0002, null);
            } else {
                des = des.replace(/public\//, '');
                callback(null, des);
            }
        }); 
    }
}
