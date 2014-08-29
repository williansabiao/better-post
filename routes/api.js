var express = require('express');
var api = express.Router();
var FB = require('fb');

api.get('/pages', function(req, res) {
  var query = req.query || {};
  query.id__user = req.session.user_id;
console.log(query);
  GLOBAL.app.models.pages.find(query).exec(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

api.post('/pages', function(req, res) {
  
  for(i in req.body) {
    req.body[i].id__user = req.session.user_id;

    if(req.body[i].id) {
      req.body[i].status = 1;
      GLOBAL.app.models.pages.update(req.body[i], function(err, model) {
        if(err) return res.json({ err: err }, 500);
        //res.json(model);
      });
    } else {
      console.log(req.body[i]);
      var parameters              = {};
      parameters.access_token     = req.session.access_token;
      parameters.fields = ['name','username','likes','access_token', 'category','link'];
      FB.api('/' + req.body[i].name, 'get', parameters , function (result) {
        if(!result || result.error) {
            return res.send(500, result || 'error');
            // return res.send(500, 'error');
        }

        GLOBAL.app.models.pages.findOne({id_fb : result.id, id__user: req.session.user_id}).exec(function(error, page){
          if(!error && !page) {
            GLOBAL.app.models.pages.create({
              id_fb: result.id,
              access_token: "",
              name: result.name,
              username: result.username,
              likes: result.likes,
              category: result.category,
              link: result.link,
              json_response: result,
              id__user: req.session.user_id,
              status: 1
            }).exec(function(err, page) {
              console.log('inserted page', page, err);
            });
          }
        });
      });
    }
  }
  res.json({"ok":true});
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