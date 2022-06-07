var express = require('express');
var bodyParser=require('body-parser');
require('dotenv').config();
let app = express();
console.log("Hello World");

// app.get("/", function(req, res) {
//   res.send('Hello Express');
// });



app.use((req, res, next) => {
 let string = `${req.method} ${req.path} - ${req.ip}`
 // console.log(req.mathod+" "+req.path+" - "+req.ip);
  console.log(string);
  console.log(req);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
console.log(bodyParser);

app.get("/", function(req, res) {
res.sendFile("/views/index.html", {root:__dirname})
 });
app.use(express.static(__dirname + '/public'))
app.use('/public', express.static(__dirname + "/public"));




app.get('/json', function(req, res) {
  let resMsg={"message": "Hello json"}
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    resMsg.message= resMsg.message.toUpperCase();
    res.json(resMsg);
  } else {
      res.json(resMsg);
  }
});


function getTime(){
  return new Date().toString();
};

app.get('/now', (req, res, next) => {
  req.time = getTime();
  next();
}, (req, res) => {
  res.json({ time: req.time })
});


app.get('/:word/echo', (req, res) => {
  res.json( {echo: req.params.word});
});


app.get('/name', (req, res) => {
  res.json({name: req.query.first+" "+req.query.last})
});


app.post('/name', (req, res) => {
  res.json({name: req.body.first+" "+req.body.last})
});












 module.exports = app;
