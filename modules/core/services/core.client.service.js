'use strict';

//Factories for global usage
angular.module('core').factory('_', ['$window',
  function($window) {
    return $window._;
  }
]).service('TrianglifyService', [function() {
  this.getCanvasImage = function() {
    return new window.Trianglify({
      variance:0.75,
      stroke_width: 1.51,
      cell_size : 500,
      x_colors : 'Blues',
      width:1920,
      height:1080
    }).png();
  };
}]).factory('LoginSharedService', function($rootScope) {
  var sharedService = {};

  sharedService.loggedInUserDetails = '';

  sharedService.prepForBroadcast = function(user) {
    this.loggedInUserDetails = user;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return sharedService;
});
