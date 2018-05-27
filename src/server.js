var express = require('express');
var app = express();
var request = require('request');

app.set('port', 3000);

app.get('/getnews', function(req, res) {
	var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A736FCCD373C01491715163D7FB4DFB1&steamid=76561198021742536';
	request.get(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
