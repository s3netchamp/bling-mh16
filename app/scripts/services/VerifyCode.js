'use strict';

/**
 * @ngdoc function
 * @name Bling.service:VerifyCode
 * @description
 * # VerifyCode
 * Sends verification sms to phone
 */
 angular.module('Bling')
  // use factory for services
  .factory('VerifyCode', function($http, $q) {


    return function (reqid, code) {
      var defer = $q.defer();
      var url = 'https://api.nexmo.com/verify/json?api_key=80962491&api_secret=143ce6dc221dfd7e&request_id='+reqid+'&code='+code;
      console.log(url);
      $http({
        method: 'GET',
        url: url
      }).then(function (response) {
        defer.resolve(response);
      }, function (response) {
        defer.reject(response);
      });
      return defer.promise;
    };

  });
