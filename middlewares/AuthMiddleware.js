function isAdmin(req, res, next){
    if(req.session.isLogged){
        next()
    }else{
         res.redirect("/admin/login");
    }
}

module.exports = { isAdmin }; 