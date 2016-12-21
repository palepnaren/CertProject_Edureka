var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var chalk = require('chalk');

exports.main = function(req,res){
  if('/'){
  var message = 'Page loaded success...';
}else if ('/employee') {
  var message = 'Showing Employee details below or Added a new employee';
}else if ('/employee/:id') {
  var message = "Employee deleted or Updated";

}
  res.render('Home',{errorMessage:null,successMessage:message});
}

//creating a new employee and storing it it mongo db data base.
exports.createEmployee = function(req,res){
  var date = new Date();
  var name = req.body.name;
  var email = req.body.email;
  var date_of_birth = req.body.date_of_birth;
  var department = req.body.department;
  var gender = req.body.gender;
  var calculating = date.getFullYear() - Number(date_of_birth.substr(0,4));
  var age = calculating;

  var newUser = new Employee();
  newUser.name = name;
  newUser.email = email;
  newUser.date_of_birth = date_of_birth;
  newUser.department = department;
  newUser.gender = gender;
  newUser.age = age;

  newUser.save(function(err,data){
    if(err){
      console.log(chalk.green(req.body));
      console.log(chalk.red("User with same email id exists please try with different email id"));
      var error = "please enter different email id.";
      res.render('Home',{errorMessage:error,successMessage:null});
      //return;
    }
    else{
      console.log(chalk.green("Employee added successfully"));
      Employee.find({},function(err,result){
      //var success = "added successfully.";
      res.json(data);
      //res.render('Home',{errorMessage:null,successMessage:success,result:result});
      //return ;
    });
    }
  });
}

//displaying all the employee details.

exports.getEmployees = function(req,res){

  Employee.find({}, function(err,data){

    console.log(chalk.blue(data));
    if(err){
      console.log(chalk.red("Unable to load employee details try later."));
      var error = "Error occured while loading details.";
      res.render('Home',{errorMessage:error,successMessage:null});
    }
    else{
      console.log(chalk.green("Successfully retrived."));
      //var success = "Showing the employee details below.";
       //res.render('Home',{errorMessage:null,successMessage:success});
      //res.sendFile('/Users/narenpalep/Desktop/Edureka_Certificate_project/public/Home.html');
      res.json(data);
      //return ;

    }
  });
}

//updating employee details.

exports.updateEmployee = function(req,res){
  var date = new Date();
  var name = req.body.name;
  var email = req.body.email;
  var date_of_birth = req.body.date_of_birth;
  var department = req.body.department;
  var gender = req.body.gender;
  var calculating = date.getFullYear() - Number(date_of_birth.substr(0,4));
  var age = calculating;
  var id = req.params.id;

  Employee.update({_id:id},{name:name,email:email,date_of_birth:date_of_birth,
    department:department,gender:gender,age:age},function(err,data){
      if(err){
        console.log(chalk.red("Cann't edit employee details at this time."));
        var error = "Problem in updating Employee details try later.";
        res.render('Home',{errorMessage:error,successMessage:null});
      }
      else{
        console.log(chalk.green("Updated successfully."));
        Employee.find({},function(err,result){
        //var success = "Employee details updated successfully.";
        res.json(data);
        //res.render('Home',{errorMessage:null,successMessage:success,result:result});
        //return ;
      });
      }
    });
}

//deleting employee details.

exports.deleteEmployee = function(req,res){
var id = req.params.id;
  Employee.remove({_id:id},function(err,deleted){
    if(err){
      console.log(chalk.red("Cann't delete employee details at this time."));
      var error = "Problem in deleting Employee details try later.";
      res.render('Home',{errorMessage:error,successMessage:null});
    }
    else{
      console.log(chalk.green("Deleted successfully."));
      Employee.find({},function(err,result){
      //var success = "Employee deleted successfully.";
      res.json(result);
      //res.render('Home',{errorMessage:null,successMessage:success,result:result});
      //return ;
    });
    }
  });
}
//gives the one employee data back with id to the controller.js
exports.collectData = function(req,res){
  var id = req.params.id;
  Employee.findOne({_id:id},function(err,data){
    if(err){
      console.log(chalk.red("Cann't get employee details at this time."));
      var error = "Problem in displaying Employee details try later.";
      res.render('Home',{errorMessage:error,successMessage:null});
    }
    else{
      console.log(chalk.green("Got the employee."));
      res.json(data);
    }
  });
}
