'use strict';

/**
 * @ngdoc function
 * @name Bling.service:SendQuestion
 * @description
 * # SendQuestion
 * SendQuestion ref
 */
 angular.module('Bling')
  // use factory for services
  .factory('SendQuestion', function(FirebaseRef, $q, $cordovaGeolocation) {

    function chatKey(phone1, phone2) {
      return (phone1 > phone2) ? phone1+'_'+phone2 : phone2 +'_'+ phone1;
    }

    return {

      single: function (from, to, q) {

        var defer = $q.defer();

        function setQ() {
          return FirebaseRef.child('questions/'+chatKey(from, to)).push({
            question: q,
            sender: from
          });
        }
        function updateUserQ() {
          var obj = {};
          obj[chatKey(from,to)] = true;
          return FirebaseRef.child('users/'+from+'/chatKeys').update(obj);
        }
        setQ().then(updateUserQ).then(function (res) {
          defer.resolve('success', res);
        }, function(err){
          defer.reject(err);
        });
        return defer.promise;

      },
      answer : function (chatKey, questionKey, opt) {

        var defer = $q.defer();

        FirebaseRef.child('questions/'+chatKey+'/'+questionKey).update({
          answered: true,
          answer: {
            id: opt.id,
            text: opt.text
          }
        }, function (err) {
          if(!err){
            defer.resolve(questionKey);
          }
          else{
            defer.reject(err);
          }
        });
        return defer.promise;
      },
      askLocation : function (from, to) {
        var defer = $q.defer();

        FirebaseRef.child('locationRequests').push({
          from: from,
          to: to,
        }, function (err) {
          if(!err)  
            defer.resolve('success');
          else
            defer.reject(err);
        });
        return defer.promise;
      },
      sendLocation : function (key) {
        var defer = $q.defer();

        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            // var lat  = position.coords.latitude
            // var long = position.coords.longitude
            return FirebaseRef.child('locationRequests/'+key).update({
              location: position.coords
            });
          })
          .then(function (err) {
            if(!err)
              defer.resolve('location sent');
            else
              defer.reject(err);
          });
          return defer.promise;
      }

    };

  });
