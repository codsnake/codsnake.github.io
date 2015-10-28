(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['StoreService', '$scope', '$location', '$rootScope', 'FlashService'];
    function RegisterController(StoreService, $scope, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        vm.firstStepComplete = false;
        vm.stepButton = "Continuar";

        $scope.toggleStep = function(boolean){
          if(boolean){
            vm.firstStepComplete = false;
            vm.stepButton = "Continuar";
          } else {
            vm.firstStepComplete = true;
            vm.stepButton = "Voltar";
          }
        }

        function register() {
            vm.dataLoading = true;

            var store = vm.store;

            var geocoder = new google.maps.Geocoder();
            var address = store.address + ", " + store.number + ", " + store.city;
            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
              {
                  store.latitude = results[0].geometry.location.lat();
                  store.longitude = results[0].geometry.location.lng();

                  StoreService.Create(store)
                    .then(function (response) {
                        if (response) {
                            FlashService.Success('Estabelecimento registrado com sucesso!', true);
                            $location.path('/login');
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    })
              }
            });
        }

    }

})();
