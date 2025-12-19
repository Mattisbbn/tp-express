var express = require('express');
var router = express.Router();
const usersController = require("../controllers/UserController");

router.get('/users',usersController.getAll);
router.get('/user/:id',usersController.getOne);
router.delete('/user/:id/delete',usersController.delete)


module.exports = router;
