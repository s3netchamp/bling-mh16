'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollCtrl
 * @description
 * # PollCtrl
 */
angular.module('Bling')
  .controller('PollCtrl', function($rootScope,$scope, $ionicPopover, $state, SendVerification, VerifyCode ) {
    $rootScope.option={};
    console.log('PollCtrl');
   	$rootScope.q = {
  		optionCount:0
  	};

  	$scope.getNumber = function(num) {
  		num = parseInt(num);
  		return new Array(num);
  	}

  	$scope.send = function (q) {
  		
  	}
      $scope.print = function (modelname) {
  		console.log($scope.option[modelname]);
          console.log($rootScope.q.optionCount);

  	}

  });
