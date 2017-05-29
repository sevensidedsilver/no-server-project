'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: "no-server-project/templates/home.html"
    }).state('litehome', {
        url: '/ltc',
        templateUrl: "../templates/homeltc.html"
    }).state('insight', {
        url: '/insight',
        templateUrl: "../templates/insight.html"
    }).state('coins', {
        url: '/coins',
        templateUrl: "../templates/coins.html"
    }).state('info', {
        url: '/info',
        templateUrl: "../templates/info.html"
    });

    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').service('mainSrv', function ($http) {

    this.getBitcoinCurrentPrice = function () {
        return $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/currentprice/CNY.json'
        }).then(function (response) {
            //console.log(response)
            return response;
        });
    };

    // get yesterday's price
    this.getPriceYesterday = function () {
        return $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'
        }).then(function (response) {

            var obj = response.data.bpi;

            var key = Object.keys(obj).toString();

            var yesterdayPrice = obj[key];

            return yesterdayPrice;
        });
    };

    this.getMonthlyBitcoinData = function () {
        return $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
        }).then(function (response) {
            //console.log(response.data.bpi)
            return response;
        });
    };
});
'use strict';

angular.module('app').controller('chartCtrl', function ($scope, mainSrv) {

  // needs to be generated from key values of mainSrv.getMonthlyBitcoinData

  mainSrv.getMonthlyBitcoinData().then(function (response) {
    plotData(response);
  });

  var plotData = function plotData(response) {
    var monthlyData = response.data.bpi;

    var xAxis = Object.keys(monthlyData);
    var yAxis = Object.values(monthlyData);

    //remove year from yAxis
    xAxis.forEach(function (val, i, xAxis) {
      val = val.substring(5, 9);
    });

    var ctxDir = document.getElementById("myChart");
    var lineChart = new Chart(ctxDir, {
      type: 'line',
      options: {
        maintainAspectRatio: false
      },
      data: {

        labels: xAxis,
        datasets: [{
          label: 'bitcoins',
          data: yAxis,
          backgroundColor: "rgba(153,255,51,0.4)"
        }]
      }
    });
  };
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, $window, mainSrv) {

  // bitcoin functions
  mainSrv.getCurrentPrice().then(function (response) {
    $scope.coin = "Bitcoin";
    $scope.price = response.data.bpi.USD.rate;
    $scope.displayPrice = "$ " + $scope.price.substring(0, $scope.price.length - 2);

    $scope.priceNumber = $scope.price.replace(/\,/g, '');

    //get litecoin value
    //litecoin functions
    // gets the current litecoin price
    mainSrv.getLTCvalue().then(function (response) {
      $scope.currentLTC = response.data.data.markets.btce.value * $scope.priceNumber;
      //console.log($scope.currentLTC)

      // LTC Changerate
      mainSrv.getLTCyesterday().then(function (response) {
        $scope.yesterdayLTC = Object.values(response.data.LTC)[0];

        $scope.LTCrate = (100 * (($scope.currentLTC - $scope.yesterdayLTC) / $scope.currentLTC)).toFixed(2);
      });
    });

    mainSrv.getPriceYesterday().then(function (response) {
      $scope.priceYesterday = response;

      //rate
      $scope.changeRate = (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2);
      $scope.BTCrate = (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2);
    });
  });

  mainSrv.getMonthlyBitcoinData().then(function (response) {
    $scope.monthdata = response.data.bpi;
  });

  //Ethereum
  mainSrv.getETHprice().then(function (response) {
    // console.log(response)
    $scope.ETHprice = Object.values(response)[0];

    //rate
    mainSrv.getETHyesterday().then(function (response) {
      $scope.ETHyesterday = Object.values(response.data.ETH)[0];
      $scope.ETHrate = (100 * (($scope.ETHprice - $scope.ETHyesterday) / $scope.ETHprice)).toFixed(2);
    });
  });

  //change currency
  $scope.changeToBitcoin = function () {
    $scope.displayPrice = "$ " + $scope.price.substring(0, $scope.price.length - 2);
    $scope.coin = "Bitcoin";
    $scope.changeRate = $scope.BTCrate;
    $mainSrv.animatePriceBox();
    console.log("BTC");
  };
  $scope.changeToLTC = function () {
    $scope.displayPrice = "$ " + $scope.currentLTC.toString().substring(0, $scope.price.length - 5);
    $scope.coin = "LiteCoin";
    $scope.changeRate = $scope.LTCrate;
    console.log("LTC");
  };
  $scope.changeToETH = function () {
    $scope.displayPrice = "$ " + $scope.ETHprice;
    $scope.coin = "Ether";
    $scope.changeRate = $scope.ETHrate;
    console.log("ETH");
  };
});
"use strict";
'use strict';

angular.module('app').directive('monthchart', function () {
  return {
    restrict: 'E',
    templateUrl: '../templates/homeChart.html',
    controller: 'chartCtrl'

  };
});
'use strict';

angular.module('app').service('mainSrv', function ($http) {

  this.getCurrentPrice = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/currentprice/CNY.json'
    }).then(function (response) {
      //console.log(response)
      return response;
    });
  };

  // get yesterday's price
  this.getPriceYesterday = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'
    }).then(function (response) {

      var obj = response.data.bpi;

      var key = Object.keys(obj).toString();

      var yesterdayPrice = obj[key];

      return yesterdayPrice;
    });
  };

  this.getMonthlyBitcoinData = function () {
    return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
    }).then(function (response) {
      //console.log(response.data.bpi)
      return response;
    });
  };

  //get litecoin values
  //first get the current litecoin price
  this.getLTCvalue = function () {
    return $http({
      method: 'GET',
      url: 'http://ltc.blockr.io/api/v1/coin/info'
    }).then(function (response) {
      return response;
    });
  };

  //the price 24 hours ago for the change rate
  //use node module
  var LTCYesterday = [];
  var timeStamp = Math.floor(Date.now() / 1000) - 86400;
  //console.log(timeStamp)

  this.getLTCyesterday = function () {
    return $http({
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + timeStamp
    }).then(function (response) {
      return response;
    });
  };

  //get the monthly values
  // var LTCmonthStamps = [];
  // var timeStamp = Math.floor(Date.now() / 1000);
  // for (var i = 0; i < 31; i++){
  //   timeStamp = timeStamp - 86400;
  //   LTCmonthStamps.push(timeStamp);
  // }
  //
  // console.log(LTCmonthStamps)
  //
  // for (var j = 0; j < LTCmonthStamps.length; j++){
  // this.getLTCyesterday = function(){
  //   return $http({
  //     method: 'GET',
  //     url: 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + LTCmonthStamps[i]
  //   }).then(function(response){
  //     console.log(response)
  //   })
  // }
  // }

  // Ethereum!!
  // get current value
  this.getETHprice = function () {
    return $http({
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

    }).then(function (response) {
      return response.data;
    });
  };

  //get yesterday Ether
  this.getETHyesterday = function () {
    return $http({
      method: 'GET',
      url: 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + timeStamp
    }).then(function (response) {
      return response;
    });
  };
});
'use strict';

angular.module('app').directive('scrollingStats', function ($window) {
  return {
    restrict: 'E',
    templateUrl: '../templates/scrollingStats.html'

  };
});
//# sourceMappingURL=bundle.js.map
