var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('authenticate');

});

router.post('/add', function(req, res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var ssn = req.body.ssn;
    var street = req.body.street;
    var city = req.body.city;
    var state = req.body.state;
    var county = req.body.county;
    db.query("SELECT * FROM Users WHERE `FName`=")
});

function serialize(data)
{

}

module.exports = router;