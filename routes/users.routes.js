var express = require('express');
var router = express.Router();

var UserController = require('../controller/user.controller');

/* GET users listing. */
router.get('',          UserController.getUsers);
router.get('/save',     UserController.saveUser);
router.get('/search',   UserController.searchUser);
router.get('/:id',      UserController.getUser);

module.exports = router;
