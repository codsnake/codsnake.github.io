(function () {
    'use strict';

    angular
        .module('app')
        .factory('StoreService', StoreService);

    StoreService.$inject = ['$http'];
    function StoreService($http) {
        var service = {};
        var baseRestURL = "http://www.fidelizy.com.br";

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetStoreStampsById = GetStoreStampsById;

        return service;

        function GetStoreStampsById(id){
            return $http.get(baseRestURL + '/getStoreStamps/1').then(handleSuccess, handleError('Error getting store stamps') );
            // TODO: Change 1 to ' + id.
        }

        function GetAll() {
            return $http.get('/api/stores').then(handleSuccess, handleError('Error getting all stores'));
        }

        function GetById(id) {
            return $http.get('/api/stores/' + id).then(handleSuccess, handleError('Error getting store by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/stores/' + username).then(handleSuccess, handleError('Error getting store by username'));
        }

        function Create(store) {

            return $http.get(baseRestURL + '/register/' +
                                    store.username + "/" +
                                    store.password + "/" +
                                    store.companyName + "/" +
                                    store.latitude  + "/" +
                                    store.longitude  + "/" +
                                    store.cnpj + "/" +
                                    store.username  + "/" +
                                    store.address  + "/" +
                                    store.number + "/" +
                                    store.comp + "/" +
                                    store.telefone + "/" +
                                    store.site + "/" +
                                    store.logo)
                                        .then(handleSuccess, handleError('Erro ao registrar novo estabelecimento!'));
        }

        function Update(store) {
            return $http.put('/api/stores/' + store.id, store).then(handleSuccess, handleError('Error updating store'));
        }

        function Delete(id) {
            return $http.delete('/api/stores/' + id).then(handleSuccess, handleError('Error deleting store'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
