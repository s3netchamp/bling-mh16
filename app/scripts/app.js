'use strict';

/**
 * @ngdoc overview
 * @name Bling
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('Bling', ['ionic', 'ngCordova', 'ngResource', 'ngStorage'])

  .run(function($ionicPlatform, $cordovaContacts, GetContacts) {

    $ionicPlatform.ready(function() {
      // save to use plugins here

      //OneSignal Setup
      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("ac7e4f3e-570f-4bf3-8d9a-4e9f9b3385f8",
                                   {googleProjectNumber: "313179834389"},
                                   notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);

      //Contacts
      var opts = {
        filter : '',
        multiple: true,
        fields:  [ 'displayName', 'name' ]
      };
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android
      $cordovaContacts.find(opts).then(function (contactsFound) {
        GetContacts.set(contactsFound);
      });

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
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl'
      })
      .state('ask', {
        url: '/ask',
        templateUrl: 'templates/ask.html',
        controller: 'AskCtrl'
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/register');
  });
