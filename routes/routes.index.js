var express = require('express');

var accountsController = require('../controllers/accounts.controller');
var sessions = require('../middlewares/sessions');

var router = express.Router();

/**
 * @Path /
 */

router.route('/login')
    .get(sessions.showLogin, accountsController.showLogin)
    .post(sessions.adminExists, accountsController.login);

router.route('/logout')
    .get(accountsController.logout)

router.route('/')
    .get(sessions.isLogged);

router.route('/socket.io/socket.io.js')
    .get();

module.exports = router;