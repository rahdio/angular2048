(function(){
  angular.module("2048.filters")
  .filter("value", function(){
    return function(number){
      return number == "" ? 0 : number
    }
  })
})();