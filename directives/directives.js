(function () {
    'use strict';

    angular
        .module('app')

app.directive('sidebarMenu', function sidebarMenu() {
  return {
    templateUrl: '../sidebarMenu.html',
    controller: '../sidebarMenu.Ctrl'
  };
});
