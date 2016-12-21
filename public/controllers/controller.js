var app = angular.module('CertApp',[]);
app.controller('Naren',['$scope','$http',function naren($scope,$http){

 //var chalk = require('chalk');

//dsplayes all the employee details.
var display = function(){
  $http.get('/employee').success(function(response){
    $scope.employees=response;
    $scope.employee="";
  });
};

display();

//will add new employee by calling the RESTful api created in app.js /employee.
$scope.addEmployee = function(){
  $http.post('/employee',$scope.employee).success(function(response){
    display();
  });
};

//will remove the employee details by calling the RESTful api created in app.js /employee/:id.
$scope.removeEmployee = function(id){
  $http.delete('/employee/'+id).success(function(response){
    display();
  });
};

//will get the details of the employee to be edited by calling the Restful api created in app.js /employee/:id.
$scope.editEmployee = function(id){
  $http.get('/employee/'+id).success(function(response){
    $scope.employee=response;
  });
};

//will update the employee details by calling the Restful api created in app.js /employee/:id.
$scope.updateEmployee = function(){
  console.log($scope.employee._id);
  $http.put('/employee/'+$scope.employee._id,$scope.employee).success(function(response){
    display();
  });
};

$scope.clear = function(id){
  console.log(id);
  $scope.employee="";
};

}]);
