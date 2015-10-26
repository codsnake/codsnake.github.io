(function () {
    'use strict';

    angular
        .module('app')
        .controller('StampsController', StampsController);

    StampsController.$inject = ['UserService', 'StoreService', '$scope', '$rootScope'];
    function StampsController(UserService, StoreService, $scope, $rootScope) {
        var vm = this;

        vm.store = null;
        vm.storeStamps = [];
        vm.numberOfStamps = null;
        $scope.stampOwner = null;

        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.getUserById = getUserById;

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
                    console.log(vm.store);
            //    });
        }

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
                //TODO
                /*
                1- Search StampID into vm.storeStamps
                2- ADD User info into the found stamp's owner object (stamp.owner.info))
                3- Maybe bring stamps to $scope so ajax works fine.
                */

                  $scope.stampOwner = user;
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
