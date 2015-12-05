(function () {
  'use strict';

  //Directives for global usage
  angular.module('core').directive('uppercased', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (input) {
          return input ? input.toUpperCase() : '';
        });
        element.css('text-transform', 'uppercase');
      }
    };
  }).directive('lowercased', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (input) {
          return input ? input.toUpperCase() : '';
        });
        element.css('text-transform', 'lowercase');
      }
    };
  }).directive('focusMe', function ($timeout, $parse) {
    return {
      link: function (scope, element, attrs) {
        var model = $parse(attrs.focusMe);
        scope.$watch(model, function (value) {
          if (value === true) {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function () {
          scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
}());
