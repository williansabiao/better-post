app.controller('RegisterPagesCtrl', function ( $scope ) {
  $scope.othersPages = [
    { url: '', name: 'ScupBrasil' },
    { url: '', name: 'Facebook' },
    { url: '', name: 'Nintendo' },
    { url: '', name: '9GAG' }
  ];
  $scope.myPages = [
    { url: '', name: 'My dog is bad' },
    { url: '', name: 'Cats or die' },
    { url: '', name: 'Firsttt' },
    { url: '', name: '9GAG' }
  ];
  $scope.myPagesSelected = [];
  $scope.selectYourPages = '';

  $scope.addOtherPage = function ( url ) {
    $scope.othersPages.push({ name: $scope.urlPage });
    $scope.urlOtherPage = '';
  };
  $scope.removeOtherPage = function ( index ) {
    $scope.othersPages.splice( index, 1 );
  };

  $scope.addMyPage = function () {
    $scope.myPagesSelected.push($scope.selectYourPages);
    for (var i = 0; i < $scope.myPages.length; i++) {
      if ( $scope.myPages[i] === $scope.selectYourPages )
        $scope.myPages.splice( i, 1 );
    };
  };
  $scope.removeMyPage = function ( page, index ) {
    $scope.myPages.push( page );
    $scope.myPagesSelected.splice( index, 1 );
  };
});