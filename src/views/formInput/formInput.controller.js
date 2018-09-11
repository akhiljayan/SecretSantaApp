(function () {
    angular.module('app').controller('FormInputController', [
        '$state', '$scope','ssaOperations',
        function ($state, $scope,ssaopp) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;

            vm.goBack = function () {
                $state.go('welcome');
            };

            vm.addFormField = function () {
                var lastElementIndex = vm.employees.length;
                if (lastElementIndex == 0) {
                    addElement();
                } else {
                    var lastElement = vm.employees[lastElementIndex - 1];
                    if (lastElement.name != "" && lastElement.gender != "" && lastElement.manager != "") {
                        addElement();
                    }
                    $scope.$apply();
                }
            };

            vm.submitTable = function(){
                var set = ssaopp.validateInputAndGetPair(vm.employees);
                if (set.status) {
                    $state.go('showsecretsanta', {
                        data: set.data
                    });
                } else {
                    swal(set.data);
                }
            };

            vm.removeInput = function (index) {
                vm.employees.splice(index, 1);
            }

            function addElement() {
                var emp = {
                    name: "",
                    gender: "",
                    manager: ""
                };
                vm.employees.push(emp);
            };

            function onInit() {
                vm.employees = [];
            };
        }
    ]);
})();