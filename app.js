var express = require('express');
var chalk = require('chalk');
var db = require('./database/db.js');
var bdy_parser = require('body-parser');
var employee = require('./routes/employee.js');
var session = require('express-session');
//var angular = require('./public/angular.js');
//var controller = require('./controller/EmployeeController.js');
var app = express();

app.set('view engine','ejs');
//app.set('view engine','html');
app.use(express.static(__dirname+'/public'));
//app.use(express.static(__dirname+'/views'));
app.use(bdy_parser.json());
app.use(bdy_parser.urlencoded({extended:false}));
app.use(session({secret:'ancsdajsdakasccnsjskak',resave: true, saveUninitialized: true}));

app.get('/',employee.main);
app.get('/employee',employee.getEmployees);
app.post('/employee',employee.createEmployee);
app.delete('/employee/:id',employee.deleteEmployee);
app.put('/employee/:id',employee.updateEmployee);
app.get('/employee/:id',employee.collectData);


var port = process.env.PORT || 8081;
 var server = app.listen(port,function(req,res){
   console.log(chalk.green("Server starting on port "+port));
 });
