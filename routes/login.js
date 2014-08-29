var express = require('express');
var router = express.Router();
var FB              = require('fb'),
    Step            = require('step'),
    config          = require('../config.js');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});


router.redirect = function(req, res, next) {
  var accessToken = req.session.access_token;
  if(!accessToken && req.url == "/app") {
      res.redirect('/');
  }
  next();
};

router.index = function(req, res) {
  var accessToken = req.session.access_token;
  if(!accessToken) {
    res.render('index', {
        loginUrl: FB.getLoginUrl({ scope: 'user_about_me,publish_actions,manage_pages,read_insights,read_stream' })
    });
  } else {
    res.redirect('/app');
  }
};

router.loginCallback = function (req, res, next) {
    var code = req.query.code,
        modelPages = GLOBAL.app.models.pages;

    if(req.query.error) {
        // user might have disallowed the app
        return res.send('login-error ' + req.query.error_description);
    } else if(!code) {
        return res.redirect('/');
    }

    Step(
        function exchangeCodeForAccessToken() {
            FB.napi('oauth/access_token', {
                client_id:      FB.options('appId'),
                client_secret:  FB.options('appSecret'),
                redirect_uri:   FB.options('redirectUri'),
                code:           code
            }, this);
        },
        function extendAccessToken(err, result) {
            if(err) throw(err);
            FB.napi('oauth/access_token', {
                client_id:          FB.options('appId'),
                client_secret:      FB.options('appSecret'),
                grant_type:         'fb_exchange_token',
                fb_exchange_token:  result.access_token
            }, this);
        },
        function savePages(err, result) {
            if(err) return next(err);

            req.session.access_token    = result.access_token;
            req.session.expires         = result.expires || 0;

            if(req.query.code) {
                var parameters              = {};
                parameters.access_token     = req.session.access_token;
                parameters.fields           = ['name','username','likes','access_token', 'category','link'];

                FB.api('/me/accounts', 'get', parameters , function (result) {
                    if(!result || result.error) {
                        return res.send(500, result || 'error');
                        // return res.send(500, 'error');
                    }

                    for(i in result.data) {
                      modelPages.findOne({id_fb : result.data[i].id}).exec(function(error, page){
                        if(!error && !page) {
                          modelPages.create({
                            id_fb: result.data[i].id,
                            access_token: result.data[i].access_token,
                            name: result.data[i].name,
                            username: result.data[i].username,
                            likes: result.data[i].likes,
                            category: result.data[i].category,
                            link: result.data[i].link,
                            json_response: result.data[i]
                          }).exec(function(err, page) {
                            console.log('inserted', page, err);
                          });
                        }
                      });
                    }

                    return res.redirect('/');
                });
            } else {
                return res.redirect('/');
            }
        }
    );
};

router.logout = function (req, res) {
    req.session = null; // clear session
    res.redirect('/');
};

/* GET validate login */
router.get('*', router.redirect);

/* GET home page. */
router.get('/', router.index);

/* GET login-facebook. */
router.get('/loginCallback', router.loginCallback);

/* GET logout-facebook. */
router.get('/logout', router.logout);

module.exports = router;

