(function(){
  angular.module("2048", ["2048.controllers", "ui.router", "2048.filters"])
  .config(MainConfig)
  .run(Run)

  function MainConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/")
    $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "home/home.html",
      controller: "MainCtrl",
    })
  }
  MainConfig.$inject = ["$stateProvider", "$urlRouterProvider"]

  function Run($state){
    $state.go("main")
  }
  Run.$inject = ["$state"]
})();