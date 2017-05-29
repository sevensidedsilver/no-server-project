angular.module('app').controller('mainCtrl', function($scope, $window, mainSrv){

// bitcoin functions
  mainSrv.getCurrentPrice().then(function(response){
    $scope.price = response.data.bpi.USD.rate
    $scope.displayPrice = "$ " + $scope.price.substring(0, $scope.price.length-2)

    $scope.priceNumber = $scope.price.replace(/\,/g,'')

    //get litecoin value
    //litecoin functions
    // gets the current litecoin price
    mainSrv.getLTCvalue().then(function(response){
      $scope.currentLTC = (response.data.data.markets.btce.value * $scope.priceNumber)
      console.log($scope.currentLTC)

    //changerate for LTC needs to go here

    });


    mainSrv.getPriceYesterday().then(function(response){
      $scope.priceYesterday = response;


      $scope.changeRate =  (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2)
    });
  });

  mainSrv.getMonthlyBitcoinData().then(function(response){
    $scope.monthdata = response.data.bpi

  })




  //Ethereum
  mainSrv.getETHprice().then(function(response){
    $scope.ETHprice = Object.values(response)[0]
    console.log($scope.ETHprice)
    })

  //change currency
  $scope.changeToBitcoin = mainSrv.changeToBitcoin;
  $scope.changeToLTC = mainSrv.changeToLTC;
  $scope.changeToETH = mainSrv.changeToETH;

})
