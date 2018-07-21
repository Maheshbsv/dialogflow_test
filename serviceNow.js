const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const btoa = require('btoa');
require('dotenv').config();
const incident_url = process.env.snincidenturl;
const incident_table_url = process.env.snincidenttableurl;
//console.log(incident_table_url);

function postIncident(short_description, severity, callback){
  
  var requestBody = `{\"short_description\":\"${short_description}\", \"severity\":\"${severity}\"}`;
  var client=new XMLHttpRequest();
  console.log(requestBody);
    
  //client connection is set to open
  client.open("post",process.env.snincidenturl);
  client.setRequestHeader('Accept','application/json');
  client.setRequestHeader('Content-Type','application/json');

  //Eg. UserName="admin", Password="admin" for this code sample.
  client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+process.env.snpassword));

  client.onreadystatechange = function() {
    console.log('inside callback in service now') 
    if (client.readyState === 4) {
      if(typeof callback === "function"){
        callback.apply(client);
      }  
    }
  };
  client.send(requestBody);
}

function getRecords(callback){
  
  var requestBody = ""; 
  var client=new XMLHttpRequest();
  client.open("get",incident_table_url, true);

  client.setRequestHeader('Accept','application/json');
  client.setRequestHeader('Content-Type','application/json');

  //Eg. UserName="admin", Password="admin" for this code sample.
  client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+process.env.snpassword));

  client.onreadystatechange = function() { 
    if (client.readyState === 4) {
          if(typeof callback === "function"){
            callback.apply(client);
          }
        }
    };
  client.send(requestBody);
  };

function getIncidentRecord(sys_id, callback){
  
  var requestBody = ""; 
  var client=new XMLHttpRequest();
  client.open("get",incident_url+"/"+sys_id);

  client.setRequestHeader('Accept','application/json');
  client.setRequestHeader('Content-Type','application/json');
  //Eg. UserName="admin", Password="admin" for this code sample.
  client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+process.env.snpassword));

  client.onreadystatechange = function() { 
    if (client.readyState === 4) {
          if(typeof callback === "function"){
            callback.apply(client);
          }
        }
    };
  client.send(requestBody);
  }

  function incidentState(state){
    switch(state){
        case '1':
        return 'New'
        break;
        case '2':
        return 'In Progress'
        break;
        case '3':
        return 'On Hold'
        break;
        case '4':
        return 'Resolved'
        break;
        case '5':
        return 'Closed'
        break;
        case '6':
        return 'Cancelled'
        break;
        default:
        return 'unknown'
    }
  } 

module.exports =  {
  postIncident : postIncident,
  getRecords : getRecords,
  getIncidentRecord : getIncidentRecord,
  incidentState : incidentState
};

