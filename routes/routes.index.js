var express = require('express');

var accountsController = require('../controllers/accounts.controller');
var sessions = require('../middlewares/middlewares.sessions');
var intents = require('../middlewares/middlewares.intents');

var router = express.Router();

/**
 * @Path /
 */

router.route('/login')
    .get(sessions.showLogin, accountsController.showLogin)
    .post(sessions.adminExists, intents.intentExists, accountsController.login);

router.route('/logout')
    .get(accountsController.logout)

router.route('/')
    .get(sessions.isLogged);

router.route('/socket.io/socket.io.js')
    .get();

module.exports = router;