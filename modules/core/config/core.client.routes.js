'use strict';

// Setting up route
angular.module('core').config([
  '$routeProvider', '$httpProvider',
  function ($routeProvider) {

    //Set the default httpProvider to send credentials if available
    //$httpProvider.defaults.withCredentials = true;

    $routeProvider.when('/', {
      templateUrl: "modules/core/views/core.client.view.html"
    }).
    when('/users', {
      templateUrl: "modules/core/views/user.client.view.html"
    }).
    otherwise({
      redirectTo: "/"
    });
  }
]);
