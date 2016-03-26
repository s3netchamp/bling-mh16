'use strict';

/**
 * @ngdoc function
 * @name Bling.service:SendVerification
 * @description
 * # SendVerification
 * Sends verification sms to phone
 */
 angular.module('Bling')
  // use factory for services
  .factory('SendVerification', function($http, $q, API_ENDPOINT) {


    return function (phone) {
      var defer = $q.defer();

      console.log(API_ENDPOINT);

      $http({
        method: 'GET',
        url: API_ENDPOINT.prod+'/verify/json?api_key=80962491&api_secret=143ce6dc221dfd7e&number='+phone+'&brand=Bling'
      }).then(function successCallback(response) {
        defer.resolve(response);
      }, function errorCallback(response) {
        defer.reject(response);
      });
      return defer.promise;
    };

  });
