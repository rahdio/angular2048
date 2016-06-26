(function(){
  angular.module("2048.services")
  .factory("Helpers", Helpers)

  function Helpers(GRID_LENGTH){
    var self = {}
    self.range = function(){
      arr_range = []
      for (var i = 0; i < GRID_LENGTH; i++)
        arr_range.push(i)
      return arr_range
    }

    return self;
  }

  Helpers.$inject = ["GRID_LENGTH"]
})();