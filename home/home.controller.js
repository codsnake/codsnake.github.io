(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'StoreService', '$scope', '$rootScope'];
    function HomeController(UserService, StoreService, $scope, $rootScope) {
        var vm = this;

        vm.store = null;
        vm.storeStamps = [];
        vm.numberOfStamps = null;
        $scope.storeCustomer = null;

        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.getUserById = getUserById;

        initController();

        function initController() {
            loadCurrentStore();
            loadCurrentStoreStamps();
            loadGreetings();
        }

        function loadCurrentStore() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
                    vm.store = $rootScope.globals.currentUser; //user;
                    //console.log(vm.store);
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

        function loadGreetings(){
          var today = new Date()
          var curHr = today.getHours();

          if(curHr<12){
                vm.greetings = "Bom dia!";
          }else if(curHr<18){
                vm.greetings = "Boa tarde!";
          }else{
                vm.greetings = "Boa noite!";
          }
        }

        function getUserById(id){
            UserService.GetById(id)
              .then(function(user){
                  $scope.storeCustomer = user;
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
