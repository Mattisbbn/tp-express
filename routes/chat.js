var express = require("express");
var router = express.Router();
const { randomUUID } = require("crypto");
const escapeHtml = require("escape-html");



/* GET home page. */
router.get("/", function (req, res, next) {
  let username;

  if (!req.session.uuid) {
    req.session.uuid = randomUUID();
  }

  if (req.session.username && req.session.username !== "") {
    username = req.session.username
  }

  res.render("pages/chat/index", {
    title: "Chat",
    query: req.query,
    uuid: req.session.uuid,
    username
  });
});

router.post("/username", async function (req, res, next) {

  try{
    let username = req.body.username
    username = escapeHtml(username)

    if(!username && !username.length > 0) throw new Error('Veuillez choisir un nom d\'utilisateur valide !')

    req.session.username = username;
    req.session.uuid = randomUUID();

    res.redirect("/chat");
  }catch(e){

  }

});

module.exports = router;
