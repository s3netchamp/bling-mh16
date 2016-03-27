'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollParticipationCtrl
 * @description
 * # PollParticipationCtrl
 */
angular.module('Bling')
  .controller('PollParticipationCtrl', function($scope , FirebaseRef , $localStorage, $ionicPopup) {
    
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

                FirebaseRef.child('polls/'+$scope.poll.id+'/pollEnded').on('value', function (snap) {
                    console.log(snap.val());
                    if(snap.val()){

                        FirebaseRef.child('polls/'+$scope.poll.id+'/options').once('value', function (data) {
                            
                            $scope.results = data.val();
                             var myPopup = $ionicPopup.show({
                                template: '<div class="list"><div class="item" ng-repeat="op in results">{{op.text}}<span class="item-note">{{op.selected}}</span></div></div>',
                                title: 'Poll Results',
                                subTitle: $scope.poll.subject,
                                scope: $scope,
                                buttons: [
                                  { text: 'OK' }
                                ]
                              });
                        });
                    }
                });
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
