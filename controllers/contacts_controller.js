var Contact = require('../models/contact_model');
var mailers = require('../mailers/contact_email');

exports.getNewContactPage = function(req, res){

  // res.render('newContactPage', {message: "undefined"});
  res.render('newContactPage', {login: req.user});
};


exports.createNewContact = function(req, res){

  var name = req.body.name;
  var email = req.body.email;
  var comment = req.body.comment;

  console.log("New Contact: " + JSON.stringify(req.body));
  Contact.createContact(name, email, comment, function(err){
    if(err){
      res.redirect('/error');
    }else{
      mailers.sendEmail(name, email, comment, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Email Sent");
        }
      });
      // res.redirect('/', {message: req.flash('success')});
      res.redirect('/');
    }
  });
}
