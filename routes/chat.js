var express = require("express");
var router = express.Router();
const { isUserLogged } = require("../utils/auth");
const messages = require('../assets/json/messages.json')


/* GET home page. */
router.get("/", function (req, res, next) {
  res.locals.messages = messages
  res.render("pages/chat/index", {
    title: "Chat",
    query: req.query,
  });
});

module.exports = router;
