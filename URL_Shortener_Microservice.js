require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const { Schema } = mongoose;
const dns = require("dns");
// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("database connected!");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var urlSchema = new mongoose.Schema({
  id: Number,
  url: String
});

var urlModel = mongoose.model("url", urlSchema);

// Your first API endpoint
app.post("/api/shorturl", (req, res) => {
  var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  
  dns.lookup(req.body.url.replace(urlRegex, ""), (err) => {
    if (err) {
      return res.json({"error":"invalid url"});
    }
      urlModel.find().exec().then(data => {
          new urlModel({id: data.length+1, url:req.body.url})
            .save().then(() => {
            res.json({original_url: req.body.url, short_url: data.length + 1});
          })
          .catch(err => {
            res.json({"error":"invalid url"});
          });
        });
  });
});

app.get("/api/shorturl/:number", (req, res) => {
  urlModel.find({ id: req.params.number }).exec().then(url => {
      res.redirect(url[0]["url"]);
    });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
