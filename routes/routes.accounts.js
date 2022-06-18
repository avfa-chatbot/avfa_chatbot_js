var express = require('express');

var accountsController = require('../controllers/accounts.controller');
var sessions = require('../middlewares/middlewares.sessions');

var router = express.Router();

/**
 * @Path /accounts
 */

router.route('/')
    .get(sessions.isAdmin, accountsController.getAllView);

router.route('/create')
    .post(sessions.isAdmin, accountsController.create);

router.route('/delete/:_id')
    .get(sessions.isAdmin, accountsController.delete);

router.route('/update/:_id')
    .get(sessions.isAdmin, accountsController.showUpdate)

router.route('/update')
    .post(sessions.isAdmin, accountsController.update);

router.route('/updatePassword')
    .post(sessions.isAdmin, accountsController.updatePassword);

module.exports = router;