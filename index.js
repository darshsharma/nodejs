var mongoose=require('mongoose');
const express=require('express');
const app=express();
const port=3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}))

mongoose.connect('mongodb://localhost/hands_on',{useNewUrlParser: true});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error :'));
db.once('open',function(){
    console.log("Connected to the Database")
});
var kittySchema =new mongoose.Schema({
    name:String,
    uid:Number,
    age:Number,
    family:String,
    freinds:[{name: String,uid :Number}]
});
var Kitten =mongoose.model('Kitten',kittySchema);
app.post('/insertKitty',function(req,res){
	var fluffy = new Kitten({name: req.body.name, age: req.body.age,
		family: req.body.family,
		friends:[{body: req.body.commentBody, name: req.body.senderName,
			uid: req.body.senderUid }]
	});

	fluffy.save(function(err,fluffy){
		if(err){
			console.error(err)
			return res.send('Error in inserting Kitten')
		}
		return res.send('Kitten Added Succesfully')
	})
})