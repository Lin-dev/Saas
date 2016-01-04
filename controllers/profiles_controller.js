var User = require('../models/users');

var fs = require("fs");

var file = "SaasApp.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);



exports.newProfile = function(req, res){
  console.log("in profiles_controller");
  var userId = req.user.id;
  console.log(userId);
  User.getUserById(userId, function(err, user){
  // User.getProfileByUserId(userId, function(err, user){
    if(user!=null){
      res.render("newProfile", {login: user});
    }
  });
};


exports.userProfile = function(req, res){
  console.log("in profiles_controller: user profile");
  var userId = req.user.id;
  console.log(userId);

  var profile = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    job_title: req.body.job_title,
    phone_number: req.body.phone_number,
    contact_email: req.body.contact_email,
    description: req.body.description,
  };
  console.log(JSON.stringify(profile));

  User.getProfileByUserId(userId, function(err, user){
    if(user===null){
      User.saveUserProfile(userId, profile, function(err){
        if(err){
          console.log("Error");
          res.redirect('/error');
        }else{
          console.log("Success");
          res.redirect('/users/:id');
        }
      });
    }else{
      User.updateUserProfile(userId, profile, function(err){
        if(err){
          console.log("Error");
          res.redirect('/users/:id/profile/edit');
        }else{
          console.log("Success");
          res.redirect('/users/:id');
        }
      });
    }
  });


};


exports.showProfile = function(req, res){
  var id = req.user.id;
  console.log(id);
  User.getProfileByUserId(id, function(err, user){
    if(user!=null){
      res.render("profile", {user: user, login: req.user});
    }
  });
};

exports.editProfile = function(req, res){
  console.log("in profiles_controller");
  var userId = req.user.id;
  console.log(userId);
  User.getUserById(userId, function(err, user){
  // User.getProfileByUserId(userId, function(err, user){
    if(user!=null){
      console.log(user);
      res.render("editProfile", {login: user});
    }
  });
};
