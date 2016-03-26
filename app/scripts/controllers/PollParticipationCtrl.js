'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollParticipationCtrl
 * @description
 * # PollParticipationCtrl
 */
angular.module('Bling')
  .controller('PollParticipationCtrl', function($rootScope, $scope, $ionicPopover, $state, SendVerification, VerifyCode ) {

    console.log('PollParticipationCtrl');
    console.log($rootScope.q.optionCount);

  });
