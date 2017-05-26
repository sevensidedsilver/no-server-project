angular.module('app').directive('monthchart', function(){
  return{
    restrict: 'E',
    templateUrl: '../templates/homeChart.html',
    controller: 'chartCtrl'


  }

})
