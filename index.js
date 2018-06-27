const bodyparser = require('./body-parser');
const express = require('./express');

const server = express();

server.use(bodyparser.urlencoded({
    extended:true
}));

server.use(bodyparser.json());

server.post('./', (req, res) => {
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
