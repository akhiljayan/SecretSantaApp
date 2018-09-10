(function () {
    angular.module('app').controller('JsonInputController', [
        '$state', '$scope','ssaOperations',
        function ($state, $scope, ssaopp) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;

            vm.goBack = function () {
                $state.go('welcome');
            }

            vm.prettyPrint = function (saveFlag) {
                try {
                    var ugly = vm.obj;
                    var obj = JSON.parse(ugly);
                    var pretty = JSON.stringify(obj, undefined, 4);
                    vm.obj = pretty;
                    if(saveFlag){
                        vm.checkObjectAndSave();
                    }
                } catch (e) {
                    swal("Please provide a valid Json format !!!");
                }
            }

            vm.checkObjectAndSave = function(){
                var jsonObj = JSON.parse(vm.obj);
                var set = ssaopp.getPairs(jsonObj);
                console.log(set);
            }

            function onInit() {
                vm.format = [{'id':'','name':'', 'gender':'M/F', 'manager': ''}];
                vm.employees = [];
            }
        }
    ]);
})();