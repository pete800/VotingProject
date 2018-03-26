var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var blockchain = require('../blockchain/blockchain');
/* GET home page. */
router.get('/', function(req, res) {
    //TODO check server time. If time not allowed reroute to an error page
    if(req.authentication_session && req.authentication_session.user) {
        var data = null;
        var year = '2018';
        data = db.query('SELECT * FROM Candidates WHERE YearVote=' + db.escape(year) + ';', function (error, results, field) {
            if (error) throw error;
            res.render('votingbooth', {candidates: results});
        });
    }else{
        res.redirect('/authenticate');
    }
});

router.post('/vote', function(req, res){
    var vote = req.body.pres;
    //Process vote
    db.query('SELECT * FROM Users WHERE UserID='+db.escape(req.authentication_session.user)+';', function(error, results, field){
        if(error) throw error;
        var hash = SHA256(results.UserID + results.FName + results.LName + results.SSH + results.Street + results.City
            + results.StateCode + results.County);
        blockchain.generateNewBlock(hash, vote);
        req.authentication_session.reset();
        var userHash = hash.toString();
    });
    blockchain.printChain();
    blockchain.isChainValid();
    res.redirect('/processing');
});


module.exports = router;