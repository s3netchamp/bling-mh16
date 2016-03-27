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

  .run(function($ionicPlatform, $cordovaContacts, GetContacts, $ionicLoading, $localStorage, FirebaseRef, SendQuestion, $rootScope, $ionicPopup, $cordovaGeolocation) {

    $ionicPlatform.ready(function() {
      // save to use plugins here

      if(window.cordova){
        //OneSignal Setup
        var notificationOpenedCallback = function(response) {
          // console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
          // SendQuestion.recieved(jsonData);
          console.log(response);

          if(response.additionalData.type == 'locationRequest'){
            var myPopup = $ionicPopup.show({
              template: '<button class="button button-full button-positive" ng-click="sendLocation()">Send</button>',
              title: response.message,
              scope: $rootScope,
              buttons: []
            });
            $rootScope.sendLocation = function () {
              console.log('sendLocation');
              FirebaseRef.child('locationRequests/'+response.additionalData.key).update({
                location: {
                  lat: '19.081637',
                  lon: '72.889138'
                },
                serviced: true
              }, function (err) {
                if(!err)
                  console.log('location sent');
                else
                  console.log(err);
                myPopup.close();
              });
            };
          }
          else{
            $rootScope.options = response.additionalData.buttons;
            var myPopup = $ionicPopup.show({
              template: '<button class="button button-full button-positive" ng-repeat="opt in options" ng-click="optionClicked(opt)">{{opt.text}}</button>',
              title: response.message,
              scope: $rootScope,
              buttons: []
            });

            myPopup.then(function(res) {
              console.log('Tapped!', res);
            });
            $rootScope.optionClicked = function (opt) {
              console.log('clicked', opt);
              SendQuestion.answer(response.additionalData.chatKey, response.additionalData.questionKey, opt)
                .then(function (res) {
                  console.log('answered question ', res);
                  myPopup.close();
                });
            };
          }
        };

        window.plugins.OneSignal.init("ac7e4f3e-570f-4bf3-8d9a-4e9f9b3385f8",
        {googleProjectNumber: "313179834389"},
        notificationOpenedCallback);

        // Show an alert box if a notification comes in when the user is in your app.
        window.plugins.OneSignal.enableInAppAlertNotification(false);

        if($localStorage.userData){
          console.log('onesignal ids');
          window.plugins.OneSignal.getIds(function(ids) {
            console.log('getIds: ' + JSON.stringify(ids));
            FirebaseRef.child('users/'+$localStorage.userData.phone).update({
              appId: ids.userId
            });
          });
        }

        //Contacts
        var opts = {
          filter : '',
          multiple: true,
          fields:  [ 'displayName', 'name' ]
        };
        opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android
        $ionicLoading.show({
          template: 'Getting contact list..'
        });
        $cordovaContacts.find(opts).then(function (contactsFound) {
          GetContacts.set(contactsFound);
          $ionicLoading.hide();
        });

        // console.log($cordovaGeolocation);
        // var posOptions = {timeout: 10000, enableHighAccuracy: false};
        // $cordovaGeolocation
        //   .getCurrentPosition(posOptions)
        //   .then(function (position) {
        //     // return FirebaseRef.child('locationRequests/'+response.additionalData.key).update({
        //     //   location: position.coords
        //     // });
        //     $localStorage.userData.location = position;
        //   })
        //   .then(function (err) {
        //     if(!err){
        //       console.log('location saved');
        //     }
        //     else
        //       console.log(err);
        //   });
        $localStorage.userData.location = {
          lat: '19.081637',
          lon: '72.889138'
        }
      }


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
        cache: false,
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
        cache: false,
        templateUrl: 'templates/ask.html',
        controller: 'AskCtrl',
        params: {
          phone: null
        }
      })
      .state('poll', {
        url: '/poll',
        templateUrl: 'templates/poll.html',
        controller: 'PollCtrl'
      })
      .state('pollParticipation', {
        url: '/pollParticipation',
        templateUrl: 'templates/poll-participation.html',
        controller: 'PollParticipationCtrl'
      })
      .state('pollStatus', {
        url: '/pollStatus?id',
        templateUrl: 'templates/poll-status.html',
        controller: 'PollStatusCtrl'
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/register');
  });
