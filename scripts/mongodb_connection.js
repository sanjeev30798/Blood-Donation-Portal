var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/BloodDonation";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    var dbo = db.db("BloodDonation");
    dbo.createCollection("login", function(err, res) { //users login data and password
    if (err) throw err;
    console.log("Collection created!");
    db.close();
    });
    dbo.createCollection("message", function(err, res) { //users login data and password
        if (err) throw err;
        console.log("Collection created!");
        db.close();
        });
  db.close();
});