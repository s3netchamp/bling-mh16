'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollCtrl
 * @description
 * # PollCtrl
 */
angular.module('Bling')
  .controller('PollCtrl', function($scope , $localStorage, SendQuestion,$state) {
    
  	$scope.q = {};

    $scope.options = [{
      id: 0,
      text: ''
    }];

    $scope.addOption = function () {
      $scope.options.push({
        id: $scope.options.length
      });
    };
    
    $scope.removeOption = function () {
      $scope.options.pop();
    };


  	$scope.send = function (q) {
      q.options = $scope.options;
      console.log(q);
      var from = $localStorage.userData.phone;
      q.pollId = +new Date;
      console.log(+new Date);
      SendQuestion.createPoll(from, q).then(function(res){
        console.log(res);
      }).then(function(res){
          $state.go("pollStatus" , {"id" : q.pollId});
      });
  	};
      
  });
