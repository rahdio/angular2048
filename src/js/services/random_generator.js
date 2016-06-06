(function(){
  angular.module("2048.services")
  .service("RandomGenerator", RandomGenerator)

  function RandomGenerator(){
    var self = {};
    self.emptyGrids = [];
    self.allowed = [2, 4]

    self.findEmpty = function(gameObj){
      self.emptyGrids = [];
      for (var i = 0; i < gameObj.length; i++){
        for (var j = 0; j < gameObj[i].length; j++){
          if (gameObj[i][j].number == 0){
            self.emptyGrids.push({iGrid: i, jGrid: j})
          }
        }
      }
    }

    self.removeGridpair = function(gridPair){
      var gridLocation = -1;
      for (var i = 0; i < self.emptyGrids.length; i++){
        var grid = self.emptyGrids[i];
        if (gridPair.iGrid == grid.iGrid && gridPair.jGrid == grid.jGrid){
          gridLocation = i;
          break;
        }
      }

      if (gridLocation > -1) self.emptyGrids.splice(gridLocation, 1)
    }

    self.addGridpair = function(gridPair){
      self.emptyGrids.push({iGrid: gridPair.iGrid, jGrid: gridPair.jGrid})
    }

    self.getRandompair = function(){
      return self.emptyGrids.splice(
        Math.floor(Math.random() * self.emptyGrids.length), 1
      )[0]
      console.log(self.emptyGrids.length)
    }

    self.randomNumber = function(){
      return self.allowed[Math.floor(Math.random() * self.allowed.length)]
    }

    return self;
  }
})();