var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('trackblock');
});

router.post('/check', function(req,res){

});
module.exports = router;