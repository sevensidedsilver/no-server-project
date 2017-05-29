angular.module('app', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "../templates/home.html"
            })

            .state('litehome',{
                url:'/ltc',
                templateUrl: "../templates/homeltc.html"
            })



            .state('insight',{
                url:'/insight',
                templateUrl: "../templates/insight.html"
            })
            .state('coins',{
                url:'/coins',
                templateUrl: "../templates/coins.html"
            })
            .state('info',{
                url:'/info',
                templateUrl: "../templates/info.html"
            })



        $urlRouterProvider
            .otherwise('/');
    });
