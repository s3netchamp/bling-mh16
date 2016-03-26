'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 */
angular.module('Bling')
  .controller('RegisterCtrl', function($scope, $ionicPopover, $state, SendVerification, VerifyCode, Account, $localStorage, $ionicHistory) {

    console.log('registerctrl');
    if($localStorage.active){
      $state.go('main');
    }

    var reqid;

    function createAccount(phone, name) {
      Account.create(phone, name).then(function(res){
        console.log(res);
        $localStorage.active = true;
        $state.go('main');
      }, function(err){
        console.log(err);
        $localStorage.active = true;
        $state.go('main');
      });
    }

  	$scope.sendVerification = function (phone, name) {
      console.log(phone);
      phone = phone + '';
      if(phone.length === 10){
        phone = '91' + phone;
        // SendVerification(phone).then(function(res){
        //   console.log(res);
        //   // if(res.data.status === 0){
        //     reqid = res.data.request_id;
        //     console.log('reqid set', reqid);
        //   // }
        // }, function (err) {
        //   console.log(err);
        // });
        createAccount(phone, name);
      }
      else{
        console.log('invalid phone');
      }
    };

    $scope.verifyCode = function (code) {
      VerifyCode(reqid, code).then(function (res) {
        console.log(res);
      }, function (err) {
        console.log(err);
      });
    };



  });
