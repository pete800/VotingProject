var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //TODO check server time. If time not allowed reroute to an error page
    res.render('votingbooth');

});


module.exports = router;