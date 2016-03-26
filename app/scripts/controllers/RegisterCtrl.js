'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 */
angular.module('Bling')
  .controller('RegisterCtrl', function($scope, $ionicPopover, $state, SendVerification, VerifyCode ) {

    console.log('registerctrl');

    var reqid;

  	$scope.sendVerification = function (phone) {
      console.log(phone);
      phone = phone + '';
      if(phone.length === 10){
        phone = '91' + phone;
        SendVerification(phone).then(function(res){
          console.log(res);
          // reqid = 
        }, function (err) {
          console.log(err);
        });
      }
      else{
        console.log('invalid phone');
      }
    }

    $scope.verifyCode = function (code) {
      VerifyCode(reqid, code).then(function (res) {
        console.log(res);
      }, function (err) {
        console.log(err);
      });
    }

  });
