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
    json_response: 'json'
  }
});

// Load the Models into the ORM
orm.loadCollection(Pages);

module.exports = orm;