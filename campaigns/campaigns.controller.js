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
        //$scope.stampOwner = null;

        vm.getUserById = getUserById;
        //vm.allUsers = [];
        //vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentStore();
            //loadAllUsers();
            loadCurrentStoreStamps();
        }

        function loadCurrentStore() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
                    vm.store = $rootScope.globals.currentUser; //user;
            //    });
        }

        $scope.submitForm =function(campaign){
          //TODO
          /*
          1- Gravar Campaign na lista no $scope.campaigns
          2- Setar variáveis com propriedades de campaign
          */
           $scope.test = campaign;
        };

        function loadCurrentStoreStamps() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
            StoreService.GetStoreStampsById($rootScope.globals.currentUser.id)
                  .then(function (data){
                    if(data != null && data != ""){
                      vm.storeStamps = data.stamps;
                      vm.numberOfStamps = vm.storeStamps.length;
                    }
                  });

            //    });
        }

        function getUserById(stampId, id){
            UserService.GetById(id)
              .then(function(user){
                //Done!
                /*
                1- Search StampID into vm.storeStamps
                2- ADD User info into the found stamp's owner object (stamp.owner.info))
                3- Maybe bring stamps to $scope so ajax works fine.
                */
                vm.storeStamps.forEach(function(stamp){
                  if(stamp.id == stampId){
                    stamp.owner = user;

                    //Gender conversion 1-Male 0-Female
                    if(stamp.owner.gender == 1 ){
                      stamp.owner.gender = "Masculino";
                    } else if(stamp.owner.gender ==0 ){
                      stamp.owner.gender = "Feminino";
                    }
                  }
                })
                // $scope.stampOwner = user;
              })
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
