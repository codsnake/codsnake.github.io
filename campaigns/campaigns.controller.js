(function () {
    'use strict';

    angular
        .module('app')
        .controller('CampaignsController', CampaignsController);

    CampaignsController.$inject = ['UserService', 'StoreService', '$scope', '$rootScope'];
    function CampaignsController(UserService, StoreService, $scope, $rootScope) {
        var vm = this;

        vm.store = null;
        vm.storeStamps = [];
        vm.numberOfStamps = null;
        vm.newCampaign = {};
        var sampleCampaign1 = {name: "Promoção 1", description: "Descrição da Promoção 1", startDate: "01-10-2015", endDate: "01-12-2015", reward: "Premio da promoção 1", numberOfStamps: 7}
        var sampleCampaign2 = {name: "Promoção 2", description: "Descrição da Promoção 2", startDate: "16-09-2015", endDate: "22-11-2015", reward: "Premio da promoção 2", numberOfStamps: 15}
        var sampleCampaign3 = {name: "Promoção 2", description: "Descrição da Promoção 3", startDate: "25-10-2015", endDate: "17-01-2016", reward: "Premio da promoção 3", numberOfStamps: 12}

        initController();

        function initController() {
            loadCurrentStore();
            //loadAllUsers();
            loadCurrentStoreStamps();
            $scope.campaigns = [sampleCampaign1, sampleCampaign2, sampleCampaign3]
        }

        function loadCurrentStore() {
          vm.store = $rootScope.globals.currentUser; //user;
        }

        $scope.registerNewCampaign = function(){
          //TODO
          /*
          1- Gravar Campaign na lista no $scope.campaigns
          2- Setar variáveis com propriedades de campaign
          */

          $scope.campaigns.push(vm.newCampaign);
          vm.newCampaign = {};
        };

        $scope.campaignRegisterCancel = function(){
          vm.newCampaign = {};
        }

        function loadCurrentStoreStamps() {
            StoreService.GetStoreStampsById($rootScope.globals.currentUser.id)
                  .then(function (data){
                    if(data != null && data != ""){
                      vm.storeStamps = data.stamps;
                      vm.numberOfStamps = vm.storeStamps.length;
                    }
                  });
        }


    }

})();
