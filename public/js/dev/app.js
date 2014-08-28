var app;

app = angular.module('app', ['ngRoute']);

window.routes = {
  '/app': {
    templateUrl: 'partials/index'
  }
};

app.config(function($routeProvider, $locationProvider) {
  var path, route, _ref;
  _ref = window.routes;

  for (path in _ref) {
    route = _ref[path];
    $routeProvider.when(path, route);
  }
  $routeProvider.otherwise({
    redirectTo: '/error'
  });
  return $locationProvider.html5Mode(true);
});
