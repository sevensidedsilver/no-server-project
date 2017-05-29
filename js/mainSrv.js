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
this.getLTCyesterday = function(){
  return $http({
    method: 'GET',
    url: 'https://www.investing.com/currencies/ltc-usd-historical-data'
  }).then(function(response){
    console.log(response)
  })
}

//get the monthly values




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


// change currency
this.changeToBitcoin = function(){
  console.log("BTC")
}

this.changeToLTC = function(){
  console.log("LTC")
}

this.changeToETH = function(){
  console.log("ETH")
}

})
