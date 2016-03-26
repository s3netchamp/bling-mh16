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


    return function () {
      var defer = $q.defer();

      var registered = [];
      var promises = [];
      
      if(window.cordova){
        var opts = {                                           //search options
          filter : '',                                 // 'Bob'
          multiple: true,                                      // Yes, return any contact that matches criteria
          fields:  [ 'displayName', 'name' ],                   // These are the fields to search for 'bob'.
          desiredFields: [id, name]    //return fields.
        };

        $cordovaContacts.find(opts).then(function(allContacts) {
          console.log('contacts loaded');

          // _.forEach(allContacts, function(contact){
          //   var promise = FirebaseRef.child('users/'+contact.phone).once('value', function(snap) {
          //     return snap.val();
          //   });
          //   promises.push(promise);
          // });



          defer.resolve(allContacts);
        });
        // $cordovaContacts.pickContact().then(function (contactPicked) {
        //   defer.resolve(contactPicked);
        // });
        
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
