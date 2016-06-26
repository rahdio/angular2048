(function(){
  var callSize = 0;
  angular.module("2048.controllers")
  .controller("MainCtrl", MainCtrl)
  function MainCtrl($scope, $timeout, MovementService, RandomGenerator){
    $scope.range = function(){
      arr_range = []
      for (var i = 0; i < $scope.GRID_LENGTH; i++)
        arr_range.push(i)
      return arr_range
    }

    function initValues(){
      $scope.GRID_LENGTH = 4
      $scope.verticalLimit = $scope.GRID_LENGTH - 2;

      var columnObj = {
        number: 0,
        canAdd: true
      }
      $scope.gameObj = [];
      $scope.backups = [];
      $scope.gameDone = false;

      for (var i = 0; i < $scope.GRID_LENGTH; i++){
        $scope.gameObj[i] = []
        for (var j = 0; j < $scope.GRID_LENGTH; j++){
          var column = angular.copy(columnObj)
          column.iGrid = i;
          column.jGrid = j;
          $scope.gameObj[i].push(column)
        }
      }

      RandomGenerator.findEmpty($scope.gameObj);
      fillInColumns(2);
    }

    function fillInColumns(numberOfTimes){
      for (var i = 0; i < numberOfTimes; i++){
        var pair = RandomGenerator.getRandompair();
        if (pair != undefined)
          $scope.gameObj[pair.iGrid][pair.jGrid].number = RandomGenerator.randomNumber();
        else if (transverseForMove())
          $scope.gameDone = true;
      }
    }

    function postMove(){
      fillInColumns(1);
      resetCanAdd();
    }

    function preMove(){
      if ($scope.backups.length > 10) $scope.backups.shift();
      $scope.backups.push(angular.copy($scope.gameObj));
    }

    function resetCanAdd(){
      for (var i = 0; i < $scope.GRID_LENGTH; i++){
        for (var j = 0; j < $scope.GRID_LENGTH; j++){
          $scope.gameObj[i][j].canAdd = true
        }
      }
    }

    function transverseForMove(){
      for (var i = 0; i < $scope.GRID_LENGTH; i++){
        for (var j = 0; j < $scope.GRID_LENGTH - 1; j++){
          if ($scope.gameObj[i][j] == $scope.gameObj[i][j+1])
            return false;
        }
      }

      for (var j = 0; j < $scope.GRID_LENGTH; j++){
        for (var i = 0; i < $scope.GRID_LENGTH - 1; i++){
          if ($scope.gameObj[i][j] == $scope.gameObj[i+1][j])
            return false;
        }
      }

      return true;
    }

    $scope.moveUp = function(){
      verticalPoint = 0 + 1
      preMove();
      MovementService.mover(verticalPoint, 0, verticalPoint, "up", false, $scope.gameObj, $scope.GRID_LENGTH)
      postMove();
    }

    $scope.moveLeft = function(){
      verticalPoint = 0 + 1
      preMove();
      MovementService.mover(0, verticalPoint, verticalPoint, "left", false, $scope.gameObj, $scope.GRID_LENGTH)
      postMove();
    }

    $scope.moveDown = function(){
      verticalPoint = $scope.GRID_LENGTH - 2;
      preMove();
      MovementService.mover(verticalPoint, 0, verticalPoint, "down", false, $scope.gameObj, $scope.GRID_LENGTH)
      postMove();
    }

    $scope.moveRight = function(){
      verticalPoint = $scope.GRID_LENGTH - 2;
      preMove();
      MovementService.mover(0, verticalPoint, verticalPoint, "right", false, $scope.gameObj, $scope.GRID_LENGTH)
      postMove();
    }

    $scope.undo = function(){
      $scope.gameObj = $scope.backups.pop()
    }

    $scope.newGame = function(){
      initValues();
    }

    // initValues();
  }
  MainCtrl.$inject = ["$scope", "$timeout", "MovementService", "RandomGenerator"]
})();