angular.module('app').service('mainSrv', function($http){

    this.getCurrentPrice = function (){
      return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/currentprice/CNY.json'
        }).then(function (response) {
            //console.log(response)
            return response

        });
}



// get yesterday's price
    this.getPriceYesterday = function (){
      return $http({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'
        }).then(function (response) {

            let obj = response.data.bpi

            let key = Object.keys(obj).toString()

            let yesterdayPrice = (obj[key])


            return yesterdayPrice;
        });
}





  this.getMonthlyBitcoinData = function (){
    return $http({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
      }).then(function (response) {
          console.log(response.data.bpi)
          return response

      });
}



})
