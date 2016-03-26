'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:AskCtrl
 * @description
 * # AskCtrl
 */
angular.module('Bling')
  .controller('AskCtrl', function($scope, $stateParams, SendQuestion, $localStorage) {

  	console.log('askctrl');
    console.log($stateParams);
  	$scope.q = {};

    $scope.options = [{
      id: 0,
      text: ''
    }];

    $scope.addOption = function () {
      $scope.options.push({
        id: $scope.options.length,
        value: ''
      });
    };
    $scope.removeOption = function () {
      $scope.options.pop();
    };

  	$scope.getNumber = function(num) {
  		num = parseInt(num);
      var options = [];
      for(var i=0; i<num; i++){
        options.push({
          id: i,
          value: ''
        });
      }
      return options;
  	};

  	$scope.send = function (q) {
      q.options = $scope.options;
      console.log(q);
      var from = $localStorage.userData.phone;
      var to = $stateParams.phone;
      SendQuestion.single(from, to, q).then(function(res){
        console.log(res);
      });
  	};

  });
