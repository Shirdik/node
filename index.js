const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require('os');

var data;
let port = 8090;
let hostname = os.hostname()
console.log(hostname);

http
  .createServer((req, res) => {
    let url = req.url;
    if (url === "/") {
      fs.readFile(
        path.join(__dirname, "public", "index.html"),
        (err, content) => {
          console.log('Home');
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
        );
      } else if (url === "/about") {
        fs.readFile(
          path.join(__dirname, "public", "about.html"),
          (err, content) => {
          console.log('About');
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
      );
    } else if (url === "/api") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404! Page not found.</h1>");
    }
  })
  .listen(port,hostname, `Running at ${hostname}:${port}`);



var axios = require("axios");
var data = JSON.stringify({
  collection: "data",
  database: "portfolio",
  dataSource: "Deals",
  projection: {
    
  },
});

var config = {
  method: "post",
  url: "https://us-east-1.aws.data.mongodb-api.com/app/data-otzcv/endpoint/data/v1/action/findOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key":
      "gZ3JHmVyU3aAogggUFuRlfrz0gZEmJU2Ix0B9LAXGlOxrzAPRiBunAif5vBHdgI7",
    Accept: "application/ejson",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    data = JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
