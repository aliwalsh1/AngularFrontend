var app = angular.module('app', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routerProvider) {
        $routerProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .when('/messages', {
                templateUrl: 'templates/viewMessages.html',
                controller: 'HomeCtrl'
            })
            .when('/users', {
                templateUrl: 'templates/viewUsers.html',
                controller: 'ViewCtrl'
            })
            .when('/matches', {
                templateUrl: 'templates/viewMatches.html',
                controller: 'MatchCtrl'
            })
            .when('/tournaments', {
                templateUrl: 'templates/viewTournaments.html',
                controller: 'TournamentCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }])

    // need to make match and tournament controllers

    .controller('HomeCtrl', ['$scope', 'Messages', '$route', function ($scope, Messages, $route) {
        Messages.get(function (data) {
            $scope.messages = data.response;
        })

        $scope.remove = function (id) {
            Messages.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])


    .controller('ViewCtrl', ['$scope', 'Users', 'Messages', '$routeParams', '$route', function ($scope, Users, Messages, $routeParams, $route) {
        var id = $routeParams.id;

        Messages.get({id: id}, function (data) {
            $scope.messages = data.response;
        });

        Users.get({id: id}, function (data) {
            console.log(data.response);
            $scope.users = data.response;
        })

        $scope.remove = function (id) {
            Users.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    .factory('Users', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/SundayAPI2/users/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])

    .factory('Messages', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/SundayAPI2/messages/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])