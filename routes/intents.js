var express = require('express');

var intentsController = require('../controllers/intents.controller');
var sessions = require('../middlewares/sessions');

var router = express.Router();

/**
 * @Path /intents
 */

router.route('/')
    .get(sessions.isAdmin, intentsController.getAllView);

router.route('/getAll')
    .get(intentsController.getAll);

router.route('/create')
    .post(sessions.isAdmin, intentsController.create);

router.route('/getOneById')
    .get(sessions.isAdmin, intentsController.getOneById);

router.route('/delete/:_id')
    .get(sessions.isAdmin, intentsController.delete);

router.route('/update/:_id')
    .get(sessions.isAdmin, intentsController.showUpdate);

router.route('/update')
    .post(sessions.isAdmin, intentsController.update);

module.exports = router;