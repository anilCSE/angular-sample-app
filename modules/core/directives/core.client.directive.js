(function () {
  'use strict';

  //Directives for global usage
  angular.module('core').directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope.$parent, element[0].files[0]);
          });
        });
      }
    };
  }]).directive('uppercased', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(input) {
          return input ? input.toUpperCase() : "";
        });
        element.css("text-transform","uppercase");
      }
    };
  }).directive('lowercased', function() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (input) {
          return input ? input.toUpperCase() : "";
        });
        element.css("text-transform", "lowercase");
      }
    };
  }).directive('followCard', function($interval, $window) {

    return {
      restrict: 'A',
      templateUrl: '/modules/core/views/follow.directive.view.html',
      scope: {
        contact: '='
      },
      link: function (scope, element, attributes) {

      }
    };
  }).directive('postCard', function($interval, $window) {

    return {
      restrict: 'A',
      templateUrl: '/modules/core/views/post.directive.view.html',
      scope: {
        post: '=',
        loggedInUser: '=',
        'addComment': '&addComment',
        'editPost':'&editPost',
        'confirmDeletePost':'&confirmDeletePost'
      },
      link: function (scope, element, attributes) {

      }
    };
  }).directive('focusMe', function($timeout, $parse) {
    return {
      link: function(scope, element, attrs) {
        var model = $parse(attrs.focusMe);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
          scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
}());
