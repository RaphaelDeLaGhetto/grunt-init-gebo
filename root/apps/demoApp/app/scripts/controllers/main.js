'use strict';

angular.module('demoApp')
  .config(function(TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.
//    var baseUrl = document.URL.replace('example/demo.html', '');
    var baseUrl = document.URL;

    TokenProvider.extendConfig({
//        authorizationEndpoint: 'http://localhost:3000/dialog/authorize',
        clientId: 'abc123',
        redirectUri: baseUrl + 'views/oauth2callback.html', // allow launching demo from a mirror
//        scopes: ["*"]
    });
  })
  .controller('MainCtrl', function ($scope, $window, Token) {
    $scope.accessToken = Token.get();

    $scope.authenticate = function () {
        console.log('authenticate');
    };

  });
