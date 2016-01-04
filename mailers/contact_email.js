var app = require('express')(),
    mailer = require('express-mailer');
    // nodemailer = require('nodemailer');

app.set('views', './views');
app.set('view engine', 'ejs');



exports.sendEmail = function(name, email, body, callback){
  this.name = name;
  this.email = email;
  this.body = body;

  // var smtpTrans, mailOpts;

  mailer.extend(app, {
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'devmatch92@gmail.com',
      pass: 'devmatch'
    }
  });



  app.mailer.send('contact_email', {
    from: this.email,
    to: "devmatch92@gmail.com", // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Email from Contact Us Page', // REQUIRED.
    name: this.name,
    body: this.body // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      callback(err);
      // res.send('There was an error sending the email');
      return;
    }else{
      callback(null);
      return;
    }
    // res.send('Email Sent');
  });

};
