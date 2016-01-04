

var fs = require("fs");

var file = "SaasApp.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

exports.saveNewUser = function(username, password, callback){
  db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

      var user = {
        username: username,
        password: password
      };

    db.run("INSERT INTO users VALUES (?,?,?)", null, username, password, function(err){
      if (err)
        return callback(err, false);

      console.log("After insert");
      db.each("SELECT * FROM users", function(err, row){
        console.log(row.id + "," + row.username);
      });
      return callback(null, user);
    });
  });
};

exports.getUser = function(username, password, callback){
    console.log("before select");

      db.each("SELECT * FROM users where username="  + "'" + username + "'", function(err, row){
        console.log(row.username);
        if (row.password === password){
              var user = row;
              return callback(null, user);
            }else{
              // done(null, false, {message:'Bad Password'});
              return callback(err, false);
            }
      });
};

exports.getUserById = function(userId, callback){
  console.log("Before select of getUserById");

  db.get("SELECT * FROM users where id=" + "'" + userId + "'", function(err, row){
    if (err){
      return callback(err, null);
    }else{
      console.log(JSON.stringify(row));
      return callback(null, row);
    }
  });
};

exports.saveUserProfile = function(userId, data, callback){
  console.log("In User Model: new profile");

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, job_title TEXT, phone_number TEXT, contact_email TEXT, description TEXT, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(id))");


    db.run("INSERT INTO profiles VALUES (?,?,?,?,?,?,?,?)", null, data.first_name, data.last_name, data.job_title, data.phone_number, data.contact_email, data.description, userId, function(err){
      if (err)
        return callback(err);

      console.log("After insert");
      db.each("SELECT * FROM profiles", function(err, row){
        console.log(row.id + "," + row.first_name);
      });
      return callback(null);
    });
  });
};

exports.updateUserProfile = function(userId, data, callback){
  console.log("In User Model: update profile");

  db.serialize(function() {

    db.run("UPDATE profiles SET first_name =" + "'" + data.first_name + "'" + ", last_name =" + "'" + data.last_name + "'" + ", job_title =" + "'" + data.job_title + "'" + ", phone_number =" + "'" + data.phone_number + "'" + ", contact_email =" + "'" + data.contact_email + "'" + ", description =" + "'" + data.description + "'", function(err){
      if (err)
        return callback(err);

      console.log("After insert");
      db.each("SELECT * FROM profiles", function(err, row){
        console.log(row.id + "," + row.first_name);
      });
      return callback(null);
    });
  });
};


exports.getProfileByUserId = function(userId, callback){
  console.log("Before select of getProfileByUserId");

  db.get("SELECT * FROM profiles where userId=" + "'" + userId + "'", function(err, row){
    if (err){
      return callback(err, null);
    }else{
      console.log(JSON.stringify(row));
      return callback(null, row);
    }
  });
};
