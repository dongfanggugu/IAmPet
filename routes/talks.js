var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var DATABASE = 'TalkWithYou';
var TABLE = 'talks';

var client = mysql.createConnection({
    user: 'root',
    password: '',
});

client.connect();
client.query('use ' + DATABASE);

// /* GET home page. */
router.get('/', function(req, res, next) {
    client.query(
        'select * from ' + TABLE,
        function callback(err, results, fields) {
            if (err) {
               throw err;
            }
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log("%d\t%s\t%s", results[i].id, results[i].userName, results[i].content);
                }
            }
            client.end();
        }
    );

    res.send('talk');
});

module.exports = router;