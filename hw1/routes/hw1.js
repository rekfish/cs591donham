var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hw1', { title: 'hw1' })
});
router.get('/:var1',function (req,res){
	var var1 = req.params.var1;
	res.send({string: var1, length: var1.length})
});

router.post('/post', function(req, res){
    var value = req.body;
    res.json({value: value, length: value.length})

});
module.exports = router;
