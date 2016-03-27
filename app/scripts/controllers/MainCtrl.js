'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('Bling')
  .controller('MainCtrl', function($scope, $ionicHistory, FirebaseRef, _, $localStorage) {

    $ionicHistory.clearHistory();

    $scope.items = {};
    $scope.locReqs = {};

    function addQuestion(snap) {
      console.log('child_added');
      var item = snap.val();
      $scope.items[snap.key()] = item;
      $scope.$apply('items');
    }
    function updateQuestion(snap) {
      console.log('child changed');
      var item = snap.val();
      $scope.items[snap.key()] = item;
      $scope.$apply('items');
    }

    FirebaseRef.child('users/'+$localStorage.userData.phone+'/chatKeys').once('value', function(snap) {
      var chatKeys = snap.val();
      _.forEach(chatKeys, function(value, key) {
        FirebaseRef.child('questions/'+key).orderByChild('sender').equalTo($localStorage.userData.phone).on('child_added', addQuestion);
        FirebaseRef.child('questions/'+key).orderByChild('sender').equalTo($localStorage.userData.phone).on('child_changed', updateQuestion);
      });
    });

    FirebaseRef.child('locationRequests').orderByChild('from').equalTo($localStorage.userData.phone).on('child_added', function(snap){
      $scope.locReqs[snap.key()] = snap.val();
      $scope.$apply('locReqs');
    });

  });
