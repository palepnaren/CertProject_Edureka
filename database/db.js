var chalk = require('chalk');
var mongoose = require('mongoose');

var db ="mongodb://certproject:naren539@ds133428.mlab.com:33428/edureka_cert";
mongoose.Promise = global.Promise;
mongoose.connect(db);

mongoose.connection.on("connected",function(){
    console.log(chalk.green("datbase connected to: "+db));
});

mongoose.connection.on("disconnected",function(){
    console.log(chalk.red("datbase disconnected with: "+db));
});
mongoose.connection.on("error",function(){
    console.log(chalk.red("error occured while connecting to: "+db));
});


var employeeSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true},
  date_of_birth:Date,
  department:String,
  gender:String,
  age:Number
});

mongoose.model('Employee', employeeSchema);
