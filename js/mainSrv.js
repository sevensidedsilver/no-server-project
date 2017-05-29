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
          //console.log(response.data.bpi)
          return response

      });
}


//get litecoin values
//first get the current litecoin price
this.getLTCvalue = function (){
  return $http({
  method: 'GET',
  url: 'http://ltc.blockr.io/api/v1/coin/info'
    }).then(function (response) {
        return response

    });
}

//the price 24 hours ago for the change rate
//use node module
var LTCYesterday = [];
var timeStamp = Math.floor(Date.now() / 1000) - 86400;
//console.log(timeStamp)

this.getLTCyesterday = function(){
  return $http({
    method: 'GET',
    url: 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + timeStamp
  }).then(function(response){
    return (response)
  })
}

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
this.getETHprice = function(){
  return $http({
    method: 'GET',
    url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

  }).then(function(response){
    return (response.data)
  })
}

//get yesterday Ether
this.getETHyesterday = function(){
  return $http({
    method: 'GET',
    url: 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + timeStamp
  }).then(function(response){
    return (response)
  })
}



}



)
