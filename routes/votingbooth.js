var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var blockchain = require('../blockchain/blockchain');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session && req.session.user) {
        var data = null;
        var year = '2018';
        data = db.query('SELECT * FROM Candidates WHERE YearVote=' + db.escape(year) + ';', function (error, results, field) {
            if (error) throw error;
            db.query('SELECT * FROM Voted WHERE UserID='+db.escape(req.session.user), function(error, results2, field){
                if(error) throw error;
                if(results2[0].Year2018 === 1)
                {
                    res.redirect('/voted');
                }else{
                    res.render('votingbooth', {candidates: results});
                }

            });
        });

    }else{
        res.redirect('/authenticate');
    }
});

router.post('/vote', function(req, res){
    var vote = req.body.pres;
    var hash = '';
    db.query('SELECT * FROM Users WHERE UserID='+db.escape(req.session.user)+';', function(error, results, field){
        if(error) throw error;
        hash = SHA256(results[0].UserID + results[0].FName + results[0].LName + results[0].SSH + results[0].Street + results[0].City
            + results[0].StateCode + results[0].County);
        blockchain.blockchain.generateNewBlock(hash, vote, results[0].County, results[0].StateCode);
    });

    db.query('UPDATE voted SET Year2018=1 WHERE UserID='+db.escape(req.session.user), function(error, results, field){});
    blockchain.blockchain.isChainValid();
    req.session.reset();
    req.session.hash = hash;
    res.redirect('/processing');
});


module.exports = router;