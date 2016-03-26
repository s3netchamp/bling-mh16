'use strict';

/**
 * @ngdoc function
 * @name Bling.service:Account
 * @description
 * # Account
 * Account ref
 */
 angular.module('Bling')
  // use factory for services
  .factory('Account', function(FirebaseRef, $q, $ionicPlatform, $localStorage) {

    var newUser = function (phone) {
        return FirebaseRef.child('users/'+phone+'/name').once('value');
    };
    return {

      create: function (phone, name) {
        var defer = $q.defer();

        newUser(phone)
          .then(function(snap){
            console.log(snap.val());
            if(snap.val() === null){
              console.log('Creating new account');
              return FirebaseRef.child('users/'+phone).update({
                name: name
              });
            }
            else{
              // console.log('User already exists');
              throw new Error('User already exists');
            }
          })
          .then(function(err) {
            if(!err){
              console.log('Account created successfully for '+phone);
              defer.resolve('success');
            }
          }).catch(function(err){
            defer.reject(err);
          });
          return defer.promise;
      }
    };
  });
