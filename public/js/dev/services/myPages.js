app.service('MyPagesService', function ( $resource ) {
  return $resource('/api/pages');
});