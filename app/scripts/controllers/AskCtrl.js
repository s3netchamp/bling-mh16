'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:AskCtrl
 * @description
 * # AskCtrl
 */
angular.module('Bling')
  .controller('AskCtrl', function($scope) {

  	console.log('askctrl');
  	$scope.q = {
  		optionCount:0
  	};

  	$scope.getNumber = function(num) {
  		num = parseInt(num);
  		return new Array(num);
  	}

  	$scope.send = function (q) {
  		
  	}

  });
