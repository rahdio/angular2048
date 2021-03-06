(function(){
  angular.module("2048.services")
  .factory("MovementService", MovementService)

  function MovementService(RandomGenerator, GRID_LENGTH){
    var self = {}
    self.processMove = function(upperCell, currentCell) {
      if (upperCell.number == 0){
        upperCell.number = currentCell.number;
        currentCell.number = 0;
        currentCell.canAdd = true;
        upperCell.canAdd = true;
        self.updateGenerator(currentCell, upperCell);

        return true;
      }else{
        if (upperCell.number == currentCell.number && currentCell.canAdd && upperCell.canAdd){
          upperCell.number *= 2
          currentCell.number = 0;
          upperCell.canAdd = false;
          currentCell.canAdd = true;
          self.updateGenerator(currentCell, upperCell);

          return true;
        }
      }

      return false;
    }; 

    self.updateGenerator = function(currentCell, upperCell){
      RandomGenerator.addGridpair({
        iGrid: currentCell.iGrid,
        jGrid: currentCell.jGrid
      });

      RandomGenerator.removeGridpair({
        iGrid: upperCell.iGrid,
        jGrid: upperCell.jGrid
      });
    };

    self.mover = function(startI, startJ, verticalPoint, direction, recursive, gameObj){
      switch(direction){
        case "up":
          for (var i = startI; i < GRID_LENGTH; i++){
            var rowMoved = false;
            for (var j = startJ; j < GRID_LENGTH; j++){
              var upperCell = gameObj[i-1][j]
              var currentCell = gameObj[i][j]

              if (currentCell.number == 0) continue
              processMoveResult = self.processMove(upperCell, currentCell)
              rowMoved = rowMoved ? rowMoved : processMoveResult
            }
            if (!rowMoved) continue
            if (i != verticalPoint) self.mover(i-1, 0, verticalPoint, direction, true, gameObj)
          }
          break;

        case "down":
          for (var i = startI; i > -1; i--){
            var rowMoved = false;
            for (var j = startJ; j < GRID_LENGTH; j++){
              var upperCell = gameObj[i+1][j]
              var currentCell = gameObj[i][j]

              if (currentCell.number == 0) continue
              processMoveResult = self.processMove(upperCell, currentCell)
              rowMoved = rowMoved ? rowMoved : processMoveResult
            }
            if (!rowMoved) continue;
            if (i != verticalPoint) self.mover(i+1, 0, verticalPoint, direction, true, gameObj)
          }
          break;

        case "left":
          for (var j = startJ; j < GRID_LENGTH; j++){
            var rowMoved = false;
            for (var i = startI; i < GRID_LENGTH; i++){
              var upperCell = gameObj[i][j-1]
              var currentCell = gameObj[i][j]

              if (currentCell.number == 0) continue
              processMoveResult = self.processMove(upperCell, currentCell)
              rowMoved = rowMoved ? rowMoved : processMoveResult
            }
            if (!rowMoved) continue
            if (j != verticalPoint) self.mover(0, j-1, verticalPoint, direction, true, gameObj)
          }
          break;
        case "right":
          for (var j = startJ; j > -1; j--){
            var rowMoved = false;
            for (var i = startI; i < GRID_LENGTH; i++){
              var upperCell = gameObj[i][j+1]
              var currentCell = gameObj[i][j]

              if (currentCell.number == 0) continue
              processMoveResult = self.processMove(upperCell, currentCell)
              rowMoved = rowMoved ? rowMoved : processMoveResult
            }
            if (!rowMoved) continue
            if (j != verticalPoint) self.mover(0, j+1, verticalPoint, direction, true, gameObj)
          }
          break;
      }
    }

    return self;
  }

  MovementService.$inject = ["RandomGenerator", "GRID_LENGTH"]
})();