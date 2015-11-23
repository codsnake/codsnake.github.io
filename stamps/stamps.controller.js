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
        //$scope.stampOwner = null;

        vm.getUserById = getUserById;
        //vm.allUsers = [];
        //vm.deleteUser = deleteUser;

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
            //    });
        }

        function loadCurrentStoreStamps() {
            //UserService.GetById($rootScope.globals.currentUser.id)
            //    .then(function (user) {
            StoreService.GetStoreStampsById($rootScope.globals.currentUser.id)
                  .then(function (data){
                    if(data != null && data != ""){
                      vm.storeStamps = data.stamps;
                    console.log("Selos" + vm.storeStamps);
                      vm.numberOfStamps = vm.storeStamps.length;

                      vm.storeStamps.forEach(function(stamp){

                        UserService.GetById(stamp.user).then(function(user){

                            stamp.owner = user;

                            //Gender conversion 1-Male 0-Female
                            if(stamp.owner.gender == 1 ){
                              stamp.owner.gender = "Masculino";
                            } else if(stamp.owner.gender == 0 ){
                              stamp.owner.gender = "Feminino";
                            }

                        })
                      })

                    }
                  });
            //    });
        }

        function loadAllStampsDetail(){
          vm.storeStamps.forEach(function(stamp){

            UserService.GetById(stamp.id).then(function(user){

                stamp.owner = user;

                //Gender conversion 1-Male 0-Female
                if(stamp.owner.gender == 1 ){
                  stamp.owner.gender = "Masculino";
                } else if(stamp.owner.gender == 0 ){
                  stamp.owner.gender = "Feminino";
                }

            })
          })
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
