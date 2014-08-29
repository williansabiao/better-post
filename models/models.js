var waterline = require('waterline');
var orm = new waterline();

var Pages = waterline.Collection.extend({
  identity: 'pages',
  connection: 'myLocalMySql',
  attributes: {
    id_fb: 'string',
    access_token: 'string',
    name: 'string',
    username: 'string',
    likes: 'integer',
    category: 'string',
    link: 'string',
    json_response: 'json',
    id__user : { model : 'user' }
  }
});

var User = waterline.Collection.extend({
  identity: 'user',
  connection: 'myLocalMySql',
  attributes: {
    fb_id: 'string',
    fb_auth: 'string',
    name: 'string',
    email: 'string',
    picture: 'string'
  }
});

// Load the Models into the ORM
orm.loadCollection(Pages);
orm.loadCollection(User);

module.exports = orm;