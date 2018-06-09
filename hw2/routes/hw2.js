var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});


var dbSchema = mongoose.Schema({
    name: String,
    len: String
});
var Word = mongoose.model('Word', dbSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
    Word.find({},'-id-__v',function (err,Allstrings) {
        res.json(Allstrings)
    })

});

router.get('/:var1',function (req,res){
    var var1 = new Word({ name: req.params.var1, len: req.params.var1.length });
    var1.save(function (err, var1) {
        if (err) return console.error("duplicate");
    });
	Word.find({name:req.params.var1},function (err,AllStrings) {
        res.json(AllStrings)
    })
});

router.post('/post', function(req, res){
    var value = req.body;
    newval=new Word({ name: value, len: value.length });
    newval.save(function (err) {
        if (err) return console.error("duplicate");
    });
    res.json({name:value, len: value.length})
    //I attempted to return from the DB but I kept getting a nil json
    //
    // Word.findById({name:req.params.id},function (err,AllStrings2) {
    //     res.json(AllStrings2)
    // })

});
router.delete('/delete', function(req, res){
    var value = req.body;
    Word.findByIdAndRemove(req.params.id),function (err) {
        if (err) res.send("Delete doesnt exist")};
        // deleted at most one tank document

    res.json({Name: "Delete Success",})


});
module.exports = router;
