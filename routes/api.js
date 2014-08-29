var express = require('express');
var api = express.Router();

api.get('/pages', function(req, res) {
  GLOBAL.app.models.pages.find({ id__user : req.session.user_id}).done(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

api.post('/pages', function(req, res) {
  req.body.id__user = req.session.user_id;
  GLOBAL.app.models.pages.create(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

api.get('/pages/:id', function(req, res) {
  GLOBAL.app.models.pages.findOne({ id: req.params.id, id__user : req.session.user_id }, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

api.delete('/pages/:id', function(req, res) {
  GLOBAL.app.models.pages.destroy({ id: req.params.id, id__user : req.session.user_id }, function(err) {
    if(err) return res.json({ err: err }, 500);
    res.json({ status: 'ok' });
  });
});

api.put('/pages/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;

  GLOBAL.app.models.pages.update({ id: req.params.id , id__user : req.session.user_id}, req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

module.exports = api;