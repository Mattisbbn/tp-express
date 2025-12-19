var express = require("express");
var router = express.Router();

const usersController = require("../controllers/UserController");

router.get("/", function (req, res, next) {

  res.render("pages/admin/dashboard/index.ejs", {
     title: 'Dashboard admin'
  });

});

router.get("/users", usersController.index);
router.get("/user/:id", usersController.view);


module.exports = router;