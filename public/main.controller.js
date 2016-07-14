/**
 * Created by ct37238 on 7/13/16.
 */
"use strict";
(function(){
    angular
        .module("QrelApp")
        .controller("MainController", MainController);
    function MainController($scope, $location,$http) {
        $scope.$location = $location
        var vm = this;
        vm.searchElastic=searchElastic;
        vm.submitScore=submitScore;
        vm.hits = [
            {
                rawUrl: "https://www.google.com",
                title: "Google"
            },
            {
                rawUrl: "https://www.facebook.com",
                title: "Facebook"
            }

        ];

        vm.options = [
            {
                label: "Non Relevant",
                value: "0"
            },
            {
                label: "Relevant",
                value: "1"
            },
            {
                label: "Very Relevant",
                value: "2"
            }

        ];

        function searchElastic(search) {
            if(search.query==null || search.assessorID==null || search.queryID == null) {
                vm.alert = "All fields are compulsory"
            } else {
                $http.post("/api/search",search)
                    .then(function (response) {
                        if(response.data) {
                            console.log(response.data.hits);
                            vm.hits = response.data.hits
                        }
                    })
            }
        }

        function submitScore(hit) {
            $http.post("/api/write",hit)
        }


    }
})();