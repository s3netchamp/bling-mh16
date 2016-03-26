'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 */
angular.module('Bling')
  .controller('ContactsCtrl', function($scope, $cordovaContacts, $ionicActionSheet, $state) {

  	console.log('in contacts');

    $scope.contacts = [];
    GetContacts().then(function (contacts) {
      $scope.contacts = contacts;
      console.log(contacts);
    });

  

    $scope.newAction = function (phone) {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<i class="icon ion-share"></i> Ask a question' },
         { text: '<i class="icon ion-stats-bars"></i> Vote or Poll' },
         { text: '<i class="icon ion-android-pin"></i> Ask for location' },
         { text: '<i class="icon ion-share"></i> Some other function'}
       ],
       titleText: 'Select an action',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
       },
       buttonClicked: function(index) {
          console.log(index);
          switch (index) {
            case 0:
              $state.go('ask');
              break;
            default:
              console.log('invalid');
              break;
          }
          return true;
       }
      });


    }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
    



  });
