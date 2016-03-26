'use strict';

/**
 * @ngdoc constant
 * @name Bling.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('Bling')

  // development
  .constant('API_ENDPOINT', {
    dev: 'http://192.168.2.100:8100',
    prod: 'https://api.nexmo.com'
  });
