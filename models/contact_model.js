var fs = require("fs");

// var mongodb = require('mongodb').MongoClient;

exports.createContact = function(name, email, comment, callback){
  var dt = new Date();
  var data = {
    name : name,
    email : email,
    comment : comment,
    createdAt : dt,
    updatedAt : dt
  }
  console.log(data);



var file = "SaasApp.db";
var exists = fs.existsSync(file);

// if (!exists) {
//     console.log("Creating DB file.");
//     fs.openSync(file, "w");
// }

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE contacts (name TEXT, email TEXT, comment TEXT, createdAt TEXT, updatedAt TEXT)");
  }


var stmt = db.prepare("INSERT INTO contacts (name, email, comment, createdAt, updatedAt) VALUES (?,?,?,?,?)", data.name, data.email, data.comment, data.createdAt, data.updatedAt);
console.log("after prepare");
stmt.run(function(err){
    if(err){
      console.log(err);
      callback(err);
      return;
    }else{
      console.log("Success");
      callback(null);
      return;
    }
  });

});



// var url = 'mongodb://localhost:27017/SaasApp';
//
  // mongodb.connect(url, function(err, db){
  //   var collection = db.collection('contacts');
  //   collection.insert(data, function(err, result){
  //     if (err){
  //       console.log("Problem saving data");
  //       callback(err, null);
  //       return;
  //     }else{
  //       callback(null, result);
  //       return;
  //     }
  //
  //   });
  // });




};
