var user_model = require('../models/users');
var passport = require('passport');

var fs = require("fs");

var file = "SaasApp.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


exports.getHomePage = function(req, res){
  res.render('home', { title: 'Dev Match', login: req.user});
};

exports.getAboutPage = function(req, res){
  res.render('about', {login: req.user});
};

exports.getLoginPage = function(req, res){
  res.render('logIn', {login: req.user});
};

exports.getSignUpPage = function(req, res){
  res.render('signUp', {login: req.user});
};

exports.getErrorPage = function(req, res){
  res.render('error');
};

exports.postSignUp = function(req, res, next){

  // db.serialize(function() {
  //     db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  //
  //     var user = {
  //       username: req.body.username,
  //       password: req.body.password
  //     };
  //
  //   db.run("INSERT INTO users VALUES (?,?,?)", null, req.body.username, req.body.password, function(err){
  //     console.log("After insert");
  //
  //     db.each("SELECT * FROM users", function(err, row){
  //       console.log(row.id + "," + row.username);
  //     });
  //
  //     req.login(user, function(err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       return res.redirect('/users/' + req.user.username);
  //     });
  //   });
  //
  // });

  passport.authenticate('local-signup', function(err, user, info) {
    console.log("in controller");
        if (err)
          return next(err);
        if (!user)
          return res.redirect('/signup');
        req.logIn(user, function(err) {
          if (err)
            return next(err);
          // participants.all.push({'userName' : user.local.name});
          return res.redirect('/users/' + req.user.username);
        });
      })(req, res, next);
};

exports.postLogIn = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    // if (!user) {
    //   return res.redirect('/users/logIn');
    // }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logOut = function(req, res, next){
  req.session.destroy(function (err) {
    if(err){
      console.log(err);
      return next(err);
    }
    return res.redirect('/');
  });
};

// var profile = function(user){
//   if(user===undefined){
//     console.log("Not working");
//   }else{
//     var id = user.id;
//     console.log(id);
//     user_model.getProfileByUserId(id, function(err, result){
//       // console.log(JSON.stringify(result));
//       console.log(result);
//       return result;
//     });
//   }
// };
