var http = require('http'),
    url = require('url'),
    request = require('request'),
    promise = require('promise');

var server = http.createServer(function(req, res) {
  var urlToProxy = url.parse(req.url, true).query.url;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  getData(decodeURIComponent(urlToProxy))
  .then((data) => {
        res.writeHead(200);

      res.end(data);
      next();
  })
  .catch(err => {
    //console.log(err);
    return;
  });

});


var getData = (url) => {
    return new Promise((resolve, reject) => {
        console.log("proxying: ", url);
        request(url, {}, (err, res, body) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(body);
            
        });
    });
}

console.log("listening on port 5050")
server.listen(5050);