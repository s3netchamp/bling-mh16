'use strict';

/**
 * @ngdoc function
 * @name Bling.controller:PollStatusCtrl
 * @description
 * # PollStatusCtrl
 */
angular.module('Bling')
    .controller('PollStatusCtrl', function($scope, $stateParams, FirebaseRef) {
        $scope.participantsData = {};
        $scope.participants = 0;
        $scope.options = {};
        console.log($stateParams);
        $scope.pollId = $stateParams.id;
        FirebaseRef.child("polls/" + $scope.pollId +"/options").once("value", function(snapshot){
            $scope.options = snapshot.val();   
            console.log( $scope.options);   
            $scope.$apply();     
        });
        FirebaseRef.child("polls/" + $scope.pollId + "/participants").on("child_added", function(snapshot) {
            $scope.participantsData[snapshot.key()] = snapshot.val();
            if(!$scope.options[snapshot.val()].selected)
                $scope.options[snapshot.val()].selected = 1;
            else 
                $scope.options[snapshot.val()].selected++;    
            $scope.participants = Object.keys($scope.participantsData).length;
            console.log(Object.keys($scope.participantsData).length, $scope.participantsData);
            $scope.$apply();
        });
    });
