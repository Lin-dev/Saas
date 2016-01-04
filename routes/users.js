var pages_controller = require('../controllers/pages_controller');
var profiles_controller = require('../controllers/profiles_controller');
var passport = require('passport');
// var mongodb = require('mongodb').MongoClient;


var express = require('express');
var router = express.Router();


router.get('/logIn', pages_controller.getLoginPage);
router.get('/signUp', pages_controller.getSignUpPage);

router.post('/signUp', pages_controller.postSignUp);
router.post('/logIn', pages_controller.postLogIn);

router.get('/logOut', pages_controller.logOut);

router.get('/:id/profile/new', profiles_controller.newProfile);
router.post('/:id/profile', profiles_controller.userProfile);
router.get('/:id', profiles_controller.showProfile);
router.get('/:id/profile/edit', profiles_controller.editProfile);

module.exports = router;

// TODO: flash message
// TODO: id using sign up not working, but using sign in working
// TODO: hide create form button if profile already exists
// TODO: show values on update form
// TODO: upload image
