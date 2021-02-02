var express = require('express');  
var app = express();  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');  
// Create application
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/Login_Signup.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "Login_Signup.html" );  
})  
app.post('/signup', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   response = {  
       Email:req.body.email,  
       password:req.body.pwd 
   };  
   console.log(response);  
   //es.end(JSON.stringify(response));
    
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BloodDonation");
    dbo.collection("login").insertOne(response, function(err, res) {
    if (err) throw err;
    console.log("User registered");
    db.close();
  });
}); 
   res.end("<h1 style=\"color:#4CAF50\">Thank you for registering with us </h1>");
})  
var server = app.listen(9001, function () {  
  var host = server.address().address  
  var port = server.address().port  
})  