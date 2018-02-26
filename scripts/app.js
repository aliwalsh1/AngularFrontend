var app = angular.module('app', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routerProvider) {
        $routerProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
            })
            .when('/messages', {
                templateUrl: 'templates/viewMessages.html',
                controller: 'MessagesCtrl'
            })
            .when('/sendMessage', {
                templateUrl: 'templates/sendMessage.html',
                controller: 'sendMessageCtrl'
            })
            .when('/users', {
                templateUrl: 'templates/viewUsers.html',
                controller: 'UsersCtrl'
            })
            .when('/createUser/', {
                templateUrl: 'templates/createUser.html',
                controller: 'CreateUserCtrl'
            })
            .when('/matches', {
                templateUrl: 'templates/viewMatches.html',
                controller: 'MatchCtrl'
            })
            .when('/tournaments', {
                templateUrl: 'templates/viewTournaments.html',
                controller: 'TournsCtrl'
            })
            .when('/teams', {
                templateUrl: 'templates/viewTeams.html',
                controller: 'TeamsCtrl'
            })
            .when('/createTeam', {
                templateUrl: 'templates/createTeam.html',
                controller: 'CreateTeamCtrl'
            })
            .when('/results', {
                templateUrl: 'templates/viewResults.html',
                controller: 'ResultsCtrl'
            })
            .when('/createResult', {
                templateUrl: 'templates/createResult.html',
                controller: 'CreateResultCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }])

    // need to make match and tournament controllers

    .controller('MessagesCtrl', ['$scope', 'Messages', '$route', function ($scope, Messages, $route) {
        Messages.get(function (data) {
            $scope.messages = data.response;
        });

        $scope.remove = function (id) {
            Messages.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            });
        }
    }])

    .controller('sendMessageCtrl', ['$scope', 'Messages', function ($scope, Messages) {
        $scope.settings = {
            pageTitle: "Send Message",
            action: "Send"
        };

        $scope.message = {
            id: "",
            senderID: "",
            recipientID: "",
            body: "",
            uploadID: "",
            time_stamp:"",
            ip: ""
        };

        $scope.submit = function () {
            Messages.save({message: $scope.message}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.message);
                    $scope.settings.success = "The message has sent!";
                }
            })
        }
    }])

    .controller('UsersCtrl', ['$scope', 'Users', '$route', function ($scope, Users, $route) {
        //var id = $routeParams.id;  look at the weather example to see how to get a specific item with its id

        Users.get(function (data) {
            $scope.users = data.response;
        })

        $scope.remove = function (id) {
            Users.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $scope.reload = function() {
                        $route.reload();
                    };
                }
            })
        }
    }])

    .controller('CreateUserCtrl', ['$scope', 'Users', function ($scope, Users) {
        $scope.settings = {
            pageTitle: "Add User",
            action: "Add"
        };

        $scope.user = {
            id: "",
            username: "",
            title: "",
            first: "",
            last:"",
            gender:"",
            email: "",
            handicap:"",
            ip:"",
            currentPlayer:"",
            _password:"",
            salt:"",
            teamIDs:""
        };

        $scope.submit = function () {
            Users.save({user: $scope.user}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.user);
                    $scope.settings.success = "The user has been created correctly!";
                }
            })
        }
    }])

    .controller('TournsCtrl', ['$scope', 'Tournaments', '$route', function ($scope, Tournaments, $route) {
        Tournaments.get(function (data) {
            $scope.tournaments = data.response;
        })

        $scope.remove = function (id) {
            Tournaments.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    .controller('TeamsCtrl', ['$scope', 'Teams', '$route', function ($scope, Teams, $route) {
        Teams.get(function (data) {
            $scope.teams = data.response;
        })

        $scope.remove = function (id) {
            Teams.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    .controller('CreateTeamCtrl', ['$scope', 'Teams', function ($scope, Teams) {
        $scope.settings = {
            pageTitle: "Create Team",
            action: "Send"
        };

        $scope.team = {
            id: "",
            teamName: "",
            level: "",
            colours: "",
            tournIDs: ""
        };

        $scope.submit = function () {
            Teams.save({team: $scope.team}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.team);
                    $scope.settings.success = "The team has been created!";
                }
            })
        }
    }])


    .controller('MatchCtrl', ['$scope', 'Matches', '$route', function ($scope, Matches, $route) {
        Matches.get(function (data) {
            $scope.matches = data.response;
        })

        $scope.remove = function (id) {
            Matches.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    .controller('ResultsCtrl', ['$scope', 'Results', '$route', function ($scope, Results, $route) {
        Results.get(function (data) {
            $scope.results = data.response;
        });

        $scope.remove = function (id) {
            Results.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            });
        }
    }])

    .controller('CreateResultCtrl', ['$scope', 'Results', function ($scope, Results) {
        $scope.settings = {
            pageTitle: "Create Result",
            action: "Send"
        };

        $scope.result = {
            id: "",
            firstTeamID: "",
            secondTeamID: "",
            firstTeamResult: "",
            secondTeamResult: ""
        };

        $scope.submit = function () {
            Results.save({result: $scope.result}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.result);
                    $scope.settings.success = "The result has been saved!";
                }
            })
        }
    }])


    .factory('Users', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/users/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])

    .factory('Messages', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/messages/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])

    .factory('Tournaments', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/tournaments/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])
    .factory('Teams', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/teams/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])

    .factory('Matches', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/matches/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])
    .factory('Results', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/results/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])