'use strict';

//Factories for global usage
angular.module('core').factory('_', ['$window',
  function($window) {
    return $window._;
  }
]).service('fileUpload', ['$http','Authentication', function ($http,Authentication) {
  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('file', file);
    var networkApi = Authentication.networkApi;
    $http.post(networkApi+uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(data){
        console.log('uploaded:'+data);
        return data;
      })
      .error(function(data){
        console.log('error while uploading:'+data);
        return data;
      });
  };
}]).service('TrianglifyService', [function() {
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
