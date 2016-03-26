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
  .factory('GetContacts', function($q, FirebaseRef, _) {

    var phoneContacts = [];

    return {
      set: function(contacts){
        phoneContacts = contacts;
        console.log(phoneContacts);
        console.log('fetched phone contacts');
      },

      get: function () {
        var defer = $q.defer();
        var promises = [];

        if(window.cordova){
          console.log('in');
          _.forEach(phoneContacts, function (contact) {
            _.forEach(contact.phoneNumbers, function (phone) {
                var key = phone.value.slice(1, phone.value.length);
                key = key.replace(/\s+/g, '');

                if(key.length >= 10){
                  console.log(contact.displayName, phone.value);
                  var dfd = $q.defer();
                  FirebaseRef.child('users/'+key+'/name').once('value',function (snap) {
                    if(snap.val() === null){
                      dfd.resolve(null);
                    }
                    else {
                      dfd.resolve({
                        name: contact.displayName,
                        phone: key
                      });
                    }
                  });
                  promises.push(dfd.promise);
                }

            });
          });

          $q.all(promises)
            .then(function (res) {
              console.log(res);
              var compact = _.compact(res);
              var uniq = _.uniqBy(compact, 'phone');
              defer.resolve(uniq);
            });

        }
        else{
          defer.resolve([{
            name: 'Suraj Shetty',
            phone: '917632415465'
          }]);
        }

        return defer.promise;
      }
    };

  });
