var express = require("express");
var router = express.Router();
const { isUserLogged } = require("../utils/auth");


/* GET home page. */
router.get("/login", function (req, res, next) {
  res.render("pages/admin-login", {
    title: "Formulaire connection admin",
    query: req.query,
  });
});

router.get("/dashboard", function (req, res, next) {
  const isLogged = req.session.isLogged;
  const login = req.session.login
  if (isLogged) {
    res.render("pages/admin-dashboard.ejs",{
        login,isLogged,title:'Dashboard admin'
    });
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/login", function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;

  try {
    if (name !== "admin") throw new Error("L'utilisateur n'existe pas !");
    if (password !== "admin") throw new Error("Le mot de passe n'est pas bon");

    req.session.isLogged = true 
    req.session.login = name

    res.redirect(301, "/admin/dashboard");
  } catch (e) {
    res.redirect(301, "/admin/login?error=" + encodeURIComponent(e.message));
  }
});

router.post("/logout", function (req, res, next) {
    req.session.isLogged = false 
    delete req.session.login;
    const redirectTo = req.get('Referer') || '/'
    res.redirect(redirectTo);
});


module.exports = router;
