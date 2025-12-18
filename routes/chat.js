var express = require("express");
var router = express.Router();
const { randomUUID } = require("crypto");

/* GET home page. */
router.get("/", function (req, res, next) {

  if (!req.session.uuid) {
    req.session.uuid = randomUUID();
  }

  res.render("pages/chat/index", {
    title: "Chat",
    query: req.query,
    uuid: req.session.uuid
  });
});

module.exports = router;
