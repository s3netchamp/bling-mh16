'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 */
angular.module('Bling')
  .controller('ContactsCtrl', function($scope, $cordovaContacts, $ionicActionSheet, $state, GetContacts, $ionicLoading, $localStorage, SendQuestion) {

  	console.log('in contacts');

    $scope.contacts = [];
    $ionicLoading.show();
    GetContacts.get().then(function (contacts) {
      $scope.contacts = contacts;
      $ionicLoading.hide();
      console.log(contacts);
    });

    function askLocation(phone) {
      var from = $localStorage.userData.phone,
          to = phone;
      SendQuestion.askLocation(from, to)
        .then(function (res) {
          console.log(res);
          $state.go('main');
        });
    }

    $scope.newAction = function (phone) {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<i class="icon ion-share"></i> Ask a question' },
         { text: '<i class="icon ion-android-pin"></i> Ask for location' }
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
              $state.go('ask', {phone:phone});
              break;

            case 1:
              askLocation(phone);
              break;

            default:
              console.log('invalid');
              break;
          }
          return true;
       }
      });


    };

    // $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    //   viewData.enableBack = true;
    // });

  });
