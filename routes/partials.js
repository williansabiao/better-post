var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:view', function(req, res) {
  res.render('partials/' + req.params.view);
});

module.exports = router;