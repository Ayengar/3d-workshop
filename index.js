const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

let upload = multer({ storage : storage }).array('userPhoto',5);

app.get('/',function(req,res){
  res.sendFile();
});

app.listen(port,function(){
  console.log(`Listening on port ${port}`);
});

app.post('/api/upload',function(req,res){
    console.log(req.body);
    let data = JSON.stringify(req.body);
    fs.writeFile('./uploads/test.txt', data, err => {
      if (err) {
        console.error(err);
      }
    });
    upload(req,res,function(err) {
        if(err) {
            return res.end("Something went wrong...");
        }
        res.end("Your message was sent, thank you!");
    });
});




