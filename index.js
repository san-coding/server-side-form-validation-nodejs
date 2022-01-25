function validateForm(employeeId,  employeeName, employeeQualification, employeeSalary){  

    var list=[];
    if(employeeId==""){
        list.push("Employee Id cannot be empty");
    }
    if(isNaN(employeeId)){ 
        list.push("Employee Id should contain only numbers");
    }


    if(employeeName==""){
        list.push("Employee Name is required");
    }
    // employee name should contain only characters
    else if(!employeeName.match(/^[a-zA-Z ]*$/)){
        list.push("Employee Name should not contain any numbers or special characters");
    }


    if(employeeQualification==""){
        list.push("Employee Qualification is required");
    }

    if(employeeSalary=="" || isNaN(employeeSalary)){
        list.push("Employee Salary is invalid");
    }
  
return list;
} 

function clearForm(){
    document.getElementById("employeeForm").reset();
}

var url = require("url");
const http = require('http')
var qs = require('querystring');

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    var body = ''
    request.on('data', function(data) {
      body += data
    })
    

    request.on('end', function() {
      console.log('Body: ' + body)
      var formfields = {}
    var fields=body.split("&");
    for(var i=0;i<fields.length;i++){
        var field=fields[i].split("=");
        formfields[field[0]]=field[1];
    }
   var errorList= validateForm(formfields.employeeId, formfields.employeeName, formfields.employeeQualification, formfields.employeeSalary);
      response.writeHead(200, {'Content-Type': 'text/html'})
        if(errorList.length>0){
            response.write('<h1 style="color:red">List of errors detected by server side validation</h1>');
        for(var i=0;i<errorList.length;i++){
            response.write('<h2><li>'+errorList[i]+'</li></h2>');
        }
        response.write('<h3><a href="javascript:history.back()">Go back to form</a></h3>');
    }
    else{
        response.write('<h1 style="color:green">Form has no errors, submitted successfully</h1>');
    }
        response.end()
    })
      
  }
})

const port = 9000
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)

