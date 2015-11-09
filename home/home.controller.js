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
            //loadAllUsers();
        }

        /* TODO Dada uma função que produz um número randômico inteiro entre 1 e 5,
        escreva uma função que produza um randômico inteiro entre 1 e 7. */

        function randomOnetoFive(min, max){

           var upperbound = max;
           var lowerbound = min;
           //var number = (Math.random() * ((upperbound - lowerbound) + 1) + lowerbound);
           //console.log("OneToFive: " + number);

           var number = Math.floor(Math.random() * 5 + 1);
           return number;
        }

        $scope.randomOnetoSeven = function (){

          var min = 3;
          var max = 5;

          var oneToFive = randomOnetoFive(min, max);
          //var number = Math.random(oneToFive);
          var number = Math.floor(Math.random(oneToFive) * 7 + 1);
          console.log(number);

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
