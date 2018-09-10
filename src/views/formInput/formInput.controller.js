(function () {
    angular.module('app').controller('FormInputController', [
        '$state', '$scope',
        function ($state, $scope) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;

            vm.goBack = function () {
                $state.go('welcome');
            }

            vm.addFormField = function () {
                debugger;
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
                
            }

            function addElement() {
                var emp = {
                    name: "",
                    gender: "",
                    manager: ""
                };
                vm.employees.push(emp);
            }

            function onInit() {
                vm.employees = [];
            }
        }
    ]);
})();