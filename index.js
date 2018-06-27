'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');


const server = express();

//tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or 
//complex algorithm for deep parsing that can deal with nested objects (i.e. true).
server.use(bodyParser.urlencoded({
    extended: true
}));
//tells the system that you want json to be used.
server.use(bodyParser.json());

server.post('/', (req, res) => {
    if(req.body.result.action === 'Project'){
        console.log(req.body.result);
        if(req.body.result.parameters.Project === '242'){
            return res.json({
                speech: "242 is running in Production. Throughput is low. I have no access to Issue tracker",
                displayText: "242 is running in Production. Throughput is low. I have no access to Issue tracker"
            });
        }else{
            return res.json({
                speech: "650 is in development. I do not have access to Issue tracker",
                displayText: "650 is in development. I do not have access to Issue tracker"
            });
        }

    }
    
});


server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});