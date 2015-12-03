(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', 'AuthenticationService', 'FlashService'];
    function LoginController($location, $http, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;

            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response);

                    //AuthenticationService.SetStamps();
                    $location.path('/');
                    window.scrollTo(0, 0);
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                    $location.path('/login');
                    window.scrollTo(0, 0);
                    //window.setTimeout(window.history.back(), 1000);
                }
            });
        };

        function getStamps(id){
          $http({
              url: 'http://www.fidelizy.com.br/getStoreStamps/'+id,
              method: 'GET',
              responseType: 'json'
          }).success(function (data) {
              //console.log(data);
          })
        }
    }

})();
