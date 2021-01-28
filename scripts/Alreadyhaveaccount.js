var express = require('express');  
var app = express();  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');  
// Create application
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
var b=true;
app.get('/Login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "Login.html" );  
})  
app.post('/loginuser', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   response = {  
       Email:req.body.email,  
       password:req.body.pwd 
   };  
   console.log(response);  
    try
            {
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BloodDonation");
    console.log(response.Email);
    var query1={$and: [{Email:response.Email},{password:response.password}]};
    dbo.collection("login").find(query1).toArray(function(err, result) {
            if (err) 
            {  
             db.close();
             res.end("<h1 style=\"color:#4CAF50\">User not found</h1>");
            }
        console.log(typeof(result));
        function isEmpty(obj) {
        for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
        console.log(result);
        console.log(isEmpty(dbo.collection("login").findOne(query1)));
        console.log(isEmpty(result));
        if(isEmpty(result)==false)
        {    
        console.log("User found");
        res.end("<h1 style=\"color:#4CAF50\">Welcome back </h1>");
        }
            else
            {
                db.close();
                console.log("not found");
                res.end("<h1 style=\"color:#4CAF50\">User not found </h1>");
            }
        
    db.close();
  });  }); 
     }
    catch(err)
    {    
     res.end("<h1 style=\"color:#4CAF50\">User not found</h1>");
    }
})  
var server = app.listen(9002, function () {  
  var host = server.address().address  
  var port = server.address().port  
})  