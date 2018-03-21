var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //TODO check server time. If time not allowed reroute to an error page
    if(req.authentication_session && req.authentication_session.user) {
        var data = null;
        var year = '2018';
        data = db.query('SELECT * FROM Candidates WHERE YearVote=' + db.escape(year) + ';', function (error, results, field) {
            if (error) throw error;
            console.log(results);
            res.render('votingbooth', {candidates: results});
        });
    }else{
        res.redirect('/authenticate');
    }
});

router.post('/vote', function(req, res){
    var vote = req.body.pres;
    req.authentication_session.reset();
    //Process vote

    res.redirect('/processing');
});


module.exports = router;