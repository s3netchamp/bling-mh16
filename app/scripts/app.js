'use strict';

/**
 * @ngdoc overview
 * @name Bling
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('Bling', ['ionic', 'ngCordova', 'ngResource'])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register-phone.html',
        controller: 'RegisterCtrl'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      })
      .state('ask', {
        url: '/ask',
        templateUrl: 'templates/ask.html',
        controller: 'AskCtrl'
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/register');
  });


