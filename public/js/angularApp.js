var myApp = angular.module('studentMgmtApp', []);

myApp.controller('mainController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.deleteBtn = function (studentId) {
        var url = '/students/delete/' + studentId;

        var config = {};

        $http.delete(url, config)
            .success(function (result, status) {
                $window.location.href = '/students';
            }).error(function (data, status) {
                console.log(data);
            });
    };
    
    $scope.deleteCourseBtn = function (courseId) {
        var url = '/courses/delete/' + courseId;

        var config = {};

        $http.delete(url, config)
            .success(function (result, status) {
                $window.location.href = '/courses';
            }).error(function (data, status) {
                console.log(data);
            });
    };
}]);