var pages_controller = require('../controllers/pages_controller');
//
// module.exports = function(){
//   app.get('/', pages_controller.getHomePage);
//
//   app.get('/about', pages_controller.getAboutPage);
// };

var express = require('express');
var router = express.Router();

router.get('/', pages_controller.getHomePage);

router.get('/about', pages_controller.getAboutPage);

router.get('/error', pages_controller.getErrorPage);

module.exports = router;
