'use strict';

/**
 * @ngdoc function
 * @name Bling.service:GetContacts
 * @description
 * # GetContacts
 * Sends verification sms to phone
 */
 angular.module('Bling')
  // use factory for services
  .factory('GetContacts', function($cordovaContacts, $q, FirebaseRef) {


    return function (reqid, code) {
      var defer = $q.defer();

      var registered = [];
      var promises = [];
      
      if(window.cordova){
        $cordovaContacts.find().then(function(allContacts) {
          console.log('contacts loaded');

          // _.forEach(allContacts, function(contact){
          //   var promise = FirebaseRef.child('users/'+contact.phone).once('value', function(snap) {
          //     return snap.val();
          //   });
          //   promises.push(promise);
          // });



          defer.resolve(allContacts);
        });
      }
      else{
        defer.resolve([{
          name: 'Suraj Shetty',
          phone: '7387405603'
        }])
      }

      return defer.promise;
    }
    
  });
