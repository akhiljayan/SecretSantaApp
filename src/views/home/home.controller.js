(function () {
    angular.module('app').controller('HomeController', [
        '$state', '$scope',
        function ($state, $scope) {
            var vm = this;
            vm.header = 'Home sweet home!';
            vm.$onInit = onInit;
    
            activate();
    
            ////////////
    
            function activate() {
                // Resolve start-up logic
            }
    
            vm.test = function(){
                $state.go('form.input');
            }
    
            function onInit() {
                // Initialization logic that relies on bindings being present
                // should be put in this method, which is guarranteed to
                // always be called after the bindings have been assigned.
            }
        }
    ]);
})();