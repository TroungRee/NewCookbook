let express = require('express');
var bodyParser = require('body-parser');
var routes = require("./routes");   //new

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('./'));   //new
app.use('/js', express.static('./public/js'));   //new
app.use(routes);  //new


//app.use('/', express.static('./'));   //new

//req is info sending to server from client.
//res is info sending to client from server.

  console.log("Hi");
app.listen(4007, function () {
  console.log('Example app listening on port 4007!');
});
