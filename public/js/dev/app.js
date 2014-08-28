var app;

app = angular.module('appTest', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  var path, route, _ref;
  _ref = window.routes;

  $routeProvider
  .when('/app', {
    templateUrl: 'partials/index'
  })
  .when('/app/register-pages', {
    templateUrl: 'partials/register-pages',
    controller: 'RegisterPagesCtrl'
  });
  return $locationProvider.html5Mode(true);
});
