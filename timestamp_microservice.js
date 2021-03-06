// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// "unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"
// your first API endpoint... /\d{5,}/
app.get("/api/:date", (req, res) => {

  let dateString = req.params.date;

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    return res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString()   });
  } 

  if(/\d{5,}/.test(dateString)){
    let dateInt = parseInt(dateString);
    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  }
  res.json({ error: "Invalid Date" });
});

app.get("/api/", (req , res) => {
  var date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString()});
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
