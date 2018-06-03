var express = require('express');
var app = express();
var request = require('request');

app.set('port', 4200);

app.get('/getnews', function(req, res) {
	var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A736FCCD373C01491715163D7FB4DFB1&steamid=76561198021742536';
	request.get(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});
});

app.use('/API', function(req, res) {
	var url = 'https://api.steampowered.com/'+req.url;
	request(url).pipe(res);
});

app.use(express.static(__dirname + '/docs'));


app.listen(process.env.PORT || app.get('port'), function(){
});
