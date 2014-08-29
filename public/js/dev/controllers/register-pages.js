app.controller('RegisterPagesCtrl', function ( $scope, $location, MyPagesService ) {
  $scope.myPages = MyPagesService.query();
  // $scope.myPages = [
  //   { link: '', name: 'ScupBrasil' },
  //   { link: '', name: 'Facebook' },
  //   { link: '', name: 'Nintendo' },
  //   { link: '', name: '9GAG' }
  // ];
  $scope.othersPages = [
    // { link: '', name: 'ScupBrasil' },
    // { link: '', name: 'Facebook' },
    // { link: '', name: 'Nintendo' },
    // { link: '', name: '9GAG' }
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

  $scope.save = function () {
    var savePages = $scope.myPagesSelected.concat($scope.othersPages);
    MyPagesService.save(savePages);
    $location.path("/app/dashboard");
  };
});