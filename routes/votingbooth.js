var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var blockchain = require('../blockchain/blockchain');
/* GET home page. */
router.get('/', function(req, res) {
    //TODO check server time. If time not allowed reroute to an error page
    if(req.session && req.session.user) {
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
    db.query('SELECT * FROM Users WHERE UserID='+db.escape(req.session.user)+';', function(error, results, field){
        if(error) throw error;
        var hash = SHA256(results[0].UserID + results[0].FName + results[0].LName + results[0].SSH + results[0].Street + results[0].City
            + results[0].StateCode + results[0].County);
        blockchain.generateNewBlock(hash, vote, results[0].County, results[0].StateCode);
    });
    blockchain.printChain();
    blockchain.isChainValid();
    req.session.reset();
    res.redirect('/processing');
});


module.exports = router;