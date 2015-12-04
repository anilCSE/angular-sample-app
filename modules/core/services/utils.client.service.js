'use strict';

//Factories for global usage
angular.module('core').
  factory('ToastService', [
    '$scope',
    function (
      $scope
      ) {
      return {
        showSimpleToast: function (message) {
        	alert(message);
        }
      };
    }
  ]);
