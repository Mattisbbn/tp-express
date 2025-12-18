var express = require("express");
var router = express.Router();
const { isUserLogged } = require("../utils/auth");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("pages/chat/index", {
    title: "Chat",
    query: req.query,
  });
});

module.exports = router;
