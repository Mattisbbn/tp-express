var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/prenom/:name', function(req, res, next) {
  res.render('pages/name', { name: req.params.name });
});


module.exports = router;