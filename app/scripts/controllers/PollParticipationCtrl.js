'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollParticipationCtrl
 * @description
 * # PollParticipationCtrl
 */
angular.module('Bling')
  .controller('PollParticipationCtrl', function($scope , FirebaseRef , $localStorage) {
    
    $scope.verified = false;
    $scope.options = {};
    $scope.poll = {
        id: null,
        subject : null
    }
    $scope.verify = function(){
        FirebaseRef.child("polls/"+$scope.poll.id).once("value" ,function(snapshot){
            console.log(snapshot.val() , $scope.poll.id);
            if(snapshot.exists())
            {
                $scope.verified = true;
                $scope.options = snapshot.val().options;
                $scope.poll.subject = snapshot.val().pollSubject;
                $scope.$apply();
            }
            else {
                alert("invalid id");
            }
        })
    };
     $scope.setPoll = function(optionid){
         FirebaseRef.child("polls/"+$scope.poll.id+"/participants/"+$localStorage.userData.phone).set(optionid);
        console.log("Set") ;
    }
    

  });
