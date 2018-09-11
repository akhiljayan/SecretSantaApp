(function () {
    angular.module('app').controller('ShowSecretSantaController', [
        '$state', '$stateParams', '$scope',
        function ($state, $stateParams, $scope) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;

            vm.goBack = function () {
                $state.go('welcome');
            }



            vm.printDiv = function () {
                var printContents = document.getElementById("secret-santa").innerHTML;
                var popupWin = window.open('', '_blank', 'width=300,height=300');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
                $state.go('welcome');
            }


            function onInit() {
                vm.secretsantas = $stateParams.data;
                vm.secretsantasPairs = vm.secretsantas.pairs;
                vm.secretsantasNonPairs = vm.secretsantas.nonpairs;
            }
        }
    ]);
})();