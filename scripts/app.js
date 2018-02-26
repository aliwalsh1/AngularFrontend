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
            .when('/createMatch', {
                templateUrl: 'templates/createMatch.html',
                controller: 'CreateMatchCtrl'
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
            .when('/leagues', {
                templateUrl: 'templates/viewLeagues.html',
                controller: 'LeaguesCtrl'
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

    .controller('CreateMatchCtrl', ['$scope', 'Matches', function ($scope, Matches) {
        $scope.settings = {
            pageTitle: "Add Match",
            action: "Add"
        };

        $scope.match = {
            id: "",
            firstTeamID: "",
            secondTeamID: "",
            firstTeamColours: "",
            secondTeamColours:"",
            pitch:"",
            dateAndTime: "",
            leagueID:"",
            firstTeamScore:"",
            secondTeamScore:""
        };

        $scope.submit = function () {
            Matches.save({match: $scope.match}).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.match);
                    $scope.settings.success = "The match has been created correctly!";
                }
            })
        }
    }])

    .controller('LeaguesCtrl', ['$scope', 'Leagues', '$route', function ($scope, Leagues, $route) {
        Leagues.get(function (data) {
            $scope.leagues = data.response;
        });

        $scope.remove = function (id) {
            Leagues.delete({id: id}).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            });
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

    .factory('Leagues', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/malletapi/leagues/:id', {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@_id"}}
        })
    }])