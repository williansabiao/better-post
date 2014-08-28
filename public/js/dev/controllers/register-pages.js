app.controller('RegisterPagesCtrl', function ( $scope ) {
  $scope.othersPages = [
    { url: '', name: 'ScupBrasil' },
    { url: '', name: 'Facebook' },
    { url: '', name: 'Nintendo' },
    { url: '', name: '9GAG' }
  ];

  $scope.addPage = function ( url ) {
    $scope.othersPages.push({ name: $scope.urlPage });
    $scope.urlPage = '';
  }
});