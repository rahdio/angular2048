(function(){
  var callSize = 0;
  angular.module("2048.controllers")
  .controller("MainCtrl", MainCtrl)
  function MainCtrl($scope, $timeout, MovementService){
    $scope.range = function(){
      arr_range = []
      for (var i = 0; i < $scope.GRID_LENGTH; i++)
        arr_range.push(i)
      return arr_range
    }

    function initValues(){
      $scope.GRID_LENGTH = 4
      $scope.verticalLimit = $scope.GRID_LENGTH - 2;

      var columnObj = {number: 0, canAdd: true}
      $scope.gameObj = [];

      for (var i = 0; i < $scope.GRID_LENGTH; i++){
        $scope.gameObj[i] = []
        for (var j = 0; j < $scope.GRID_LENGTH; j++){
          $scope.gameObj[i].push(angular.copy(columnObj))
        }
      }
      
      var randTimes = 2;
      var prevI = -1,
          prevJ = -1;
      // while (randTimes > 0){
      //   var iGrid = Math.round(Math.random() * ($scope.GRID_LENGTH-1)),
      //     jGrid = Math.round(Math.random() * ($scope.GRID_LENGTH-1));
      //   if (prevI == iGrid && prevJ == jGrid) continue
      //   prevI = iGrid; prevJ = jGrid
      //   $scope.gameObj[iGrid][jGrid].number = 2
      //   randTimes--;
      // }
      $scope.gameObj[3][0].number = 2
      $scope.gameObj[1][1].number = 2
      // $scope.gameObj[2][2].number = 2
    }

    $scope.moveUp = function(){
      verticalPoint = 0 + 1
      MovementService.mover(verticalPoint, 0, verticalPoint, "up", false, $scope.gameObj, $scope.GRID_LENGTH)
    }

    $scope.moveLeft = function(){
      verticalPoint = 0 + 1
      MovementService.mover(0, verticalPoint, verticalPoint, "left", false, $scope.gameObj, $scope.GRID_LENGTH)
    }

    $scope.moveDown = function(){
      verticalPoint = $scope.GRID_LENGTH - 2;
      MovementService.mover(verticalPoint, 0, verticalPoint, "down", false, $scope.gameObj, $scope.GRID_LENGTH)
    }

    $scope.moveRight = function(){
      verticalPoint = $scope.GRID_LENGTH - 2;
      MovementService.mover(0, verticalPoint, verticalPoint, "right", false, $scope.gameObj, $scope.GRID_LENGTH)
    }

    initValues();
  }
  MainCtrl.$inject = ["$scope", "$timeout", "MovementService"]
})();