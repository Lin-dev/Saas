var passport = require('passport');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done){
    done(null, user);
  });

  passport.deserializeUser(function(user, done){
    done(null, user);
  });

  // require('./strategies/local.strategy')();

  // // var mongodb = require('mongodb').MongoClient;
  //
  var fs = require("fs");

  var file = "SaasApp.db";
  var exists = fs.existsSync(file);

  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database(file);

  var express = require('express');
  var app = express();

  //
  //
  // module.exports = function(){
  //   passport.use(new LocalStrategy(
  //     // {
  //   //   usernameField: 'username',
  //   //   passwordField: 'password'
  //   // },
  //   function(username, password, done){
  //     console.log("before select");
  //
  //     db.each("SELECT * FROM users where username="  + "'" + username + "'", function(err, row){
  //       console.log(row.username);
  //       if (row.password === password){
  //             var user = row;
  //             done(null, user);
  //           }else{
  //             // done(null, false, {message:'Bad Password'});
  //             done(null, false);
  //           }
  //     });
  //
  //     // var url = 'mongodb://localhost:27017/SaasApp';
  //     // mongodb.connect(url, function(err, db){
  //     //   var collection = db.collection('users');
  //     //   collection.findOne({
  //     //     username: username
  //     //   },
  //     //   function(err, results){
  //     //     if (results.password === password){
  //     //       var user = results;
  //     //       done(null, user);
  //     //     }else{
  //     //       // done(null, false, {message:'Bad Password'});
  //     //       done(null, false);
  //     //     }
  //     //   });
  //     // });
  //
  //   }));
  //
  //
  // };



    passport.use('local-signup', new LocalStrategy(
    // {
    //   usernameField:'username',
    //   passwordField:'password',
    //   passReqToCallback : true
    // },
    function(username, password, done) {
      console.log("in local-signup");
      process.nextTick(function() {

        // db.serialize(function() {
        //     db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
        //
        //     var user = {
        //       username: req.body.username,
        //       password: req.body.password
        //     };
        //
        //   db.run("INSERT INTO users VALUES (?,?,?)", null, req.body.username, req.body.password, function(err){
        //     if (err)
        //       return done(null, false);
        //
        //     console.log("After insert");
        //     db.each("SELECT * FROM users", function(err, row){
        //       console.log(row.id + "," + row.username);
        //     });
        //     return done(null, user);



        User.saveNewUser(username, password, function(err, new_user) {
          if (err)
            return done(null, false);
          return done(null, new_user);
        });
      // });
    // });
  });
    }));

    passport.use('local-login', new LocalStrategy(
  //   {
  //   usernameField : 'name',
  //   passwordField : 'password',
  //   passReqToCallback : true
  // },
  function(username, password, done) {
    User.getUser(username, password, function(err, user) {
      if (err){
        return done(err, null);
      }
      // if (!user){
      //   console.log("User name not found");
      //   return done(null, false);
      // }
      else{
        return done(null, user);
      }
      // user.isValidPassword(password, function(isSuccessful){
      //   if (isSuccessful){
      //     return done(null, user);
      //   } else {
      //     console.log("Oops! Wrong password");
      //     return done(null, false);
      //   }
      // });
    });
  }));

  };
