var express=require('express');  
var app = express();  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');  
// Create application
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/Contact.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "Contact.html" );  
})  
app.post('/query_data', urlencodedParser, function (req, res) {  
  
   response = {  
       Name:req.body.name,  
       Email:req.body.email,
       Message:req.body.message,
       Subject:req.body.subject
   };  
   console.log(response); 
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BloodDonation");
    dbo.collection("message").insertOne(response, function(err, res) {
    if (err) throw err;
    console.log("Message received");
    db.close();
  });
});   
   res.end();  // JSON.stringify(response)for sendind response. JSON.stringify converts javascript objects to JSON formated object
})  
var server = app.listen(9000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Blood Donation app listening at http://%s:%s", host, port)  
})  

