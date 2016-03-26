'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('Bling')
  .controller('MainCtrl', function($scope, $ionicPopover, $state) {

  	var template = '';

  	$ionicPopover.fromTemplateUrl('templates/action-popover.html', {
	    scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

  	$scope.newAction = function (event) {
  		$scope.popover.show(event);
  	}

  	$scope.action = function (state) {
  		$scope.popover.hide();
  		$state.go(state);
  	}

  });
