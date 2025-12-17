var express = require("express");
var router = express.Router();
const { isLogged } = require("../utils/auth");

/* GET home page. */
router.get("/login", function (req, res, next) {
  res.render("pages/admin-login", {
    title: "Formulaire connection admin",
    query: req.query,
    isLogged: req.cookies,
  });
});

router.post("/login", function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;

  try {
    if (name !== "admin") throw new Error("L'utilisateur n'existe pas !");
    if (password !== "admin") throw new Error("Le mot de passe n'est pas bon");

    res.cookie("isLogged", "true", {
      httpOnly: true,
      maxAge: 999999,
      path: "/",
    });

    res.cookie("login", name, {
        httpOnly: true,
        maxAge: 999999,
        path: "/" 
    });

    res.redirect(301, "/admin/dashboard");
  } catch (e) {
    res.redirect(301, "/admin/login?error=" + encodeURIComponent(e.message));
  }
});

router.get("/dashboard", function (req, res, next) {
  const isLogged = req.cookies.isLogged === "true";
  const login = req.cookies.login
  if (isLogged) {
    res.render("pages/admin-dashboard.ejs",{
        login,isLogged
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
