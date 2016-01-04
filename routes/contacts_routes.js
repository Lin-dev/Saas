var contacts_controller = require('../controllers/contacts_controller');

var express = require('express');
var router = express.Router();

router.get('/new', contacts_controller.getNewContactPage);

router.post('/', contacts_controller.createNewContact);

module.exports = router;
