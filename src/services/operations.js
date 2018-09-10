(function () {
    angular.module('app').factory('ssaOperations', ['$state', '$filter', function ($state, $filter) {


        var ssaOperationFactory = {};

        ssaOperationFactory.valudateInputObject = function (input) {
            angular.forEach(input, function (index, obj) {
                if (!obj.hasOwnProperty("name") || !obj.hasOwnProperty("gender") || !obj.hasOwnProperty("manager") || !obj.hasOwnProperty("id")) {
                    return false;
                } else {
                    var gender = obj.gender.toLowerCase();
                    if (gender.toLowerCase() != "m" && gender.toLowerCase() != "f" && gender.toLowerCase() != "female" && gender.toLowerCase() != "male") {
                        return false;
                    }
                }
            });
            return true;
        }

        ssaOperationFactory.getPairs = function (input) {
            var pairs = [];
            var nonPairs = [];
            var array = input;
            angular.forEach(array, function (obj, index) {
                if (!angular.equals(obj, {})) {
                    var pairFound = $filter('filter')(array, function (m) {
                        return obj.id != m.id && obj.gender == m.gender && obj.manager != m.manager;
                    })[0];
                    if(pairFound){
                        var tempArr = [];
                        tempArr.push(obj);
                        tempArr.push(pairFound);
                        pairs.push(tempArr);
                        var pairIndex = array.indexOf(pairFound);
                        var objIndex = array.indexOf(obj);
                        array[pairIndex] = {};
                        array[objIndex] = {};
                    }else{
                        nonPairs.push(obj);
                    }
                }
            });

            debugger;

            return {
                "pairs": pairs,
                "nonpairs": array
            };
        };



        return ssaOperationFactory;

    }]);

})();