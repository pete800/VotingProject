var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var hash = req.session.hash;
    req.session.reset();
    res.render('processing',{UserID: req.session.hash});
});

module.exports = router;