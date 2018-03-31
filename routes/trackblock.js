var express = require('express');
var blockchain = require('../blockchain/blockchain');
var router = express.Router();
var UserID;
var requestedBlock;
router.get('/', function(req, res){
    res.render('trackblock');
});

router.post('/check', function(req,res){
    UserID = req.body.UserID;
    if(blockchain.blockchain.checkChainForID(UserID))
    {
        requestedBlock = blockchain.blockchain.getBlockAtIndex(blockchain.blockchain.getBlockForID(UserID));
        res.redirect('check/found');
    }else{
        res.redirect('check/none');
    }
});

router.get('/check/found', function(req, res){
    res.render('found', {block: requestedBlock});
});

router.get('/check/none', function(req, res){
    res.render('none');
});

module.exports = router;