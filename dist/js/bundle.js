'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: "../templates/home.html"
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

angular.module('app').controller('chartCtrl', function ($scope) {

  var ctxDir = document.getElementById("myChart");
  var lineChart = new Chart(ctxDir, {
    type: 'line',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'apples',
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "rgba(153,255,51,0.4)"
      }, {
        label: 'oranges',
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "rgba(255,153,0,0.4)"
      }]
    }
  });
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, $window, mainSrv) {

  mainSrv.getCurrentPrice().then(function (response) {
    $scope.price = response.data.bpi.USD.rate;

    $scope.priceNumber = $scope.price.replace(/\,/g, '');

    mainSrv.getPriceYesterday().then(function (response) {
      $scope.priceYesterday = response;

      $scope.changeRate = (100 * (($scope.priceNumber - $scope.priceYesterday) / $scope.priceNumber)).toFixed(2);
    });
  });

  mainSrv.getMonthlyBitcoinData().then(function (response) {
    $scope.monthdata = response.data.bpi;
  });
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
            console.log(response.data.bpi);
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
