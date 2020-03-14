//jshint esversion: 6
 
const express = require("express");
 
const bodyParser = require("body-parser");
 
//const got  = require("got");
 
//const request = require("request");
 
const https = require("https");
 
 
 
const app = express();
 
const port = 3000;
 
 
app.use(bodyParser.urlencoded({extended: true}));
 
 
app.use(express.static("public"));
 
 
app.get("/", function(req,res){
 
    res.sendFile(__dirname + "/signup.html");
 
   
 
});
 
 
app.post("/", function(req,res){
 
   
 
    const first_name = req.body.first_name;
 
    const last_name = req.body.last_name;
 
    const email = req.body.email;
 
    const data = {
 
        members: [
 
            {
 
              email_address: email,
 
                status:"subscribed",
 
                merge_fields: {
 
                    FNAME:first_name,
 
                    LNAME:last_name
 
                }
 
 
 
            }
 
        ]
 
    };
 
    const jsonData = JSON.stringify(data);
 
   
 
 
 
    const url = "https://us19.api.mailchimp.com/3.0/lists/f5c5bd7ffa";
 
    const options = {
 
        method: "POST",
 
        auth: "mohamed:1e2050caa090038f83c6c2c9f84bfeae-us19"
 
    };
 
    const request = https.request(url, options, function(response) {
 
        if(response.statusCode === 200) {
 
            res.sendFile(__dirname + "/success.html");
			
 
        } else {
 
            res.sendFile(__dirname + "/failure.html");
 
        }
 
        response.on("data", function(data){
 
            console.log(JSON.parse(data));
 
        });
 
       
 
    });
 
   
 
    request.write(jsonData);
 
    request.end();
 
});
 
 
app.listen(port, function() {
 
    console.log("Server is running on port 3000 :)");
 
});
 
