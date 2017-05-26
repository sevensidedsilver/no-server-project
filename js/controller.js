angular.module('app').controller('mainCtrl', function($scope, $window, mainSrv){


  mainSrv.getCurrentPrice().then(function(response){
    $scope.price = response.data.bpi.USD.rate


    $scope.priceNumber = $scope.price.replace(/\,/g,'')


    mainSrv.getPriceYesterday().then(function(response){
      $scope.priceYesterday = response;


      $scope.changeRate =  (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2)
  
    });


  });












  mainSrv.getMonthlyBitcoinData().then(function(response){
    $scope.monthdata = response.data.bpi
  })









})
