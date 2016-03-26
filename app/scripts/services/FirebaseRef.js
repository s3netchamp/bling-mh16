'use strict';

/**
 * @ngdoc function
 * @name Bling.service:FirebaseRef
 * @description
 * # FirebaseRef
 * Firebase ref
 */
 angular.module('Bling')
  // use factory for services
  .factory('FirebaseRef', function() {

    return new Firebase('https://bling-mh16.firebaseio.com');
    
  });
