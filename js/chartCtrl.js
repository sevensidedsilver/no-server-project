angular.module('app').controller('chartCtrl', function($scope, mainSrv){

  // needs to be generated from key values of mainSrv.getMonthlyBitcoinData

  mainSrv.getMonthlyBitcoinData().then(function(response){
    plotData(response)
  })



  var plotData = (function(response){
    var monthlyData = response.data.bpi

    var xAxis = Object.keys(monthlyData);
    var yAxis = Object.values(monthlyData);

    //remove year from yAxis
    xAxis.forEach(function(val, i, xAxis){
      val = val.substring(5, 9)

    })


    let ctxDir = document.getElementById("myChart");
    var lineChart = new Chart(ctxDir, {
        type: 'line',
        options:{
          maintainAspectRatio: false,
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



  })










})
