(function () {
    angular.module('app').factory('ssaOperations', ['$state', '$filter', function ($state, $filter) {
        var ssaOperationFactory = {};

        ssaOperationFactory.validateInputAndGetPair = function (input) {
            var inputArray = [];
            //angular.forEach(input, function (obj, index) {
            for (var i = 0; i < input.length; i++) {
                var obj = input[i];
                if (!obj.hasOwnProperty("name") || !obj.hasOwnProperty("gender") || !obj.hasOwnProperty("manager") || !obj.hasOwnProperty("id")) {
                    return {"status":false, "data" : "Properties givin to the employees are not valid"};
                } else {
                    var gender = obj.gender.toLowerCase();
                    if (gender.toLowerCase() != "m" && gender.toLowerCase() != "f" && gender.toLowerCase() != "female" && gender.toLowerCase() != "male") {
                        return {"status":false, "data" : "Please provide a proper value for gender"};
                    }else{
                        var parsedObj = {
                            "id":obj.id, 
                            "name": obj.name.trim(), 
                            "gender": getGender(obj.gender.trim().toLowerCase()),
                            "manager": obj.manager.trim()
                        }
                        inputArray.push(parsedObj);
                    }
                }
            }    
            //});

            var output = {"status":true, "data" : ssaOperationFactory.getPairs(inputArray)};
            return output;
        };

        ssaOperationFactory.getPairs = function (input) {
            var pairs = [];
            var nonPairs = [];
            var array = input;
            angular.forEach(array, function (obj, index) {
                if (!angular.equals(obj, {})) {
                    var pairsFound = $filter('filter')(array, function (m) {
                        return obj.id != m.id && obj.gender == m.gender && obj.manager != m.manager;
                    });
                    var pairFound = shuffle(pairsFound);
                    var santa = pairFound[0];
                    if (santa) {
                        var tempArr = [];
                        tempArr.push(obj);
                        tempArr.push(santa);
                        pairs.push(tempArr);
                        var pairIndex = array.indexOf(santa);
                        var objIndex = array.indexOf(obj);
                        array[pairIndex] = {};
                        array[objIndex] = {};
                    } else {
                        nonPairs.push(obj);
                    }
                }
            });

            var nonPairArray = $filter('filter')(array, function (m) {
                return !angular.equals(m, {})
            })

            return {
                "pairs": pairs,
                "nonpairs": nonPairArray
            };
        };

        function shuffle(array) {
            var currentIndex = array.length;
            var temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        };

        function getGender(gender){
            if(gender == 'm' || gender == 'f'){
                return gender;
            }else{
                return gender == 'male' ? 'm' : 'f';
            }
        };

        return ssaOperationFactory;
    }]);

})();