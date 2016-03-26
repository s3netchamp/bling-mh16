'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollStatusCtrl
 * @description
 * # PollStatusCtrl
 */
angular.module('Bling')
  .controller('PollStatusCtrl', function($rootScope,$scope, $ionicPopover, $state, SendVerification, VerifyCode ) {

    console.log('PollStatusCtrl');
    console.log($rootScope.q.optionCount);
  });
