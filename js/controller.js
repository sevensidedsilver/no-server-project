angular.module('app').controller('mainCtrl', function($scope, $window, mainSrv){

// bitcoin functions
  mainSrv.getCurrentPrice().then(function(response){
    $scope.coin = "Bitcoin"
    $scope.price = response.data.bpi.USD.rate
    $scope.displayPrice = "$ " + $scope.price.substring(0, $scope.price.length-2)

    $scope.priceNumber = $scope.price.replace(/\,/g,'')

    //get litecoin value
    //litecoin functions
    // gets the current litecoin price
    mainSrv.getLTCvalue().then(function(response){
      $scope.currentLTC = (response.data.data.markets.btce.value * $scope.priceNumber)
      //console.log($scope.currentLTC)

    // LTC Changerate
    mainSrv.getLTCyesterday().then(function(response){
      $scope.yesterdayLTC = Object.values(response.data.LTC)[0]


      $scope.LTCrate =  (100 * (($scope.currentLTC - $scope.yesterdayLTC) / $scope.currentLTC)).toFixed(2)

    });

    });


    mainSrv.getPriceYesterday().then(function(response){
      $scope.priceYesterday = response;

      //rate
      $scope.changeRate =  (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2)
      $scope.BTCrate = (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2)
    });
  });

  mainSrv.getMonthlyBitcoinData().then(function(response){
    $scope.monthdata = response.data.bpi

  })




  //Ethereum
  mainSrv.getETHprice().then(function(response){
    // console.log(response)
    $scope.ETHprice = Object.values(response)[0]


    //rate
    mainSrv.getETHyesterday().then(function(response){
      $scope.ETHyesterday = Object.values(response.data.ETH)[0]
        $scope.ETHrate =  (100 * (($scope.ETHprice - $scope.ETHyesterday) / $scope.ETHprice)).toFixed(2)
    })

    })


  //change currency
  $scope.changeToBitcoin = function(){
    $scope.displayPrice = "$ " + $scope.price.substring(0, $scope.price.length-2)
    $scope.coin = "Bitcoin"
    $scope.changeRate = $scope.BTCrate
    console.log("BTC")
  }
  $scope.changeToLTC = function(){
    $scope.displayPrice = "$ " + $scope.currentLTC.toString().substring(0, $scope.price.length-5)
    $scope.coin = "LiteCoin"
    $scope.changeRate = $scope.LTCrate
    console.log("LTC")
  }
  $scope.changeToETH = function(){
    $scope.displayPrice = "$ " + $scope.ETHprice
    $scope.coin = "Ether"
    $scope.changeRate = $scope.ETHrate
    console.log("ETH")
  }
})
