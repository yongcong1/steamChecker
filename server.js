var express = require('express');
var app = express();
var session = require('express-session')
var request = require('request');
var openid = require('openid');

app.use(session(
	{
		secret: 'sample',
		resave: true,
		saveUninitialized: true,
		cookie: { secure:false },
		steam64id: ''
	}
));

app.set('port', 4200);

var prod_addr = "https://steamcheck.herokuapp.com/";

var dev_addr = "http://localhost:4200";

addr = prod_addr;

apiKey = "A736FCCD373C01491715163D7FB4DFB1";

relyingParty = new openid.RelyingParty(
	addr + "verify",
	addr,
	true,
	true,
	[]
);

app.use('/Auth', function(req, res) {
	relyingParty.authenticate('https://steamcommunity.com/openid', false, function(err, authURL) {
        if(err){
          console.log(err);
          res.write('Authentication failed: ' + err);
        }
        if(!authURL){
          res.write('Authentication failed.');
        }else{ res.writeHead(301, {'location': authURL}); }
        res.end();
      });
});

app.use('/Verify', function(req, res) {
	relyingParty.verifyAssertion(req, function(err, result) {
        if(err){
          console.log(err);
          console.log(JSON.stringify(err));
          res.end("Error.")
        } else if(!result || !result.authenticated){
          res.end('Failed to authenticate user.');
        }else{
          console.log(JSON.stringify(result));
          req.session.steamID = result.claimedIdentifier.replace('http://steamcommunity.com/openid/id/', '').replace('https://steamcommunity.com/openid/id/', '');
					res.redirect("/");
        }
      });
});

app.use('/account', function(req, res){
	return res.json({"steamID": req.session.steamID, "sessionID": req.sessionID});
});

app.use('/signout', function(req, res){
	req.session.steamID = '';
	res.redirect("/");
});

app.use('/customURL/', function(req, res) {
	var url = 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/'+ '?key=' + apiKey  + req.url.substring(1);
	request(url).pipe(res);
});

app.use('/userSummary/', function(req, res) {
	var url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/'+ '?key=' + apiKey + req.url.substring(1);
	request(url).pipe(res);
});

app.use('/userStats/', function(req, res) {
	var url = 'https://api.steampowered.com//IPlayerService/GetOwnedGames/v0001/'+ '?key=' + apiKey  + req.url.substring(1);
	request(url).pipe(res);
});

app.use('/friendList/', function(req, res) {
	var url = ' http://api.steampowered.com/ISteamUser/GetFriendList/v0001/'+ '?key=' + apiKey + req.url.substring(1);
	request(url).pipe(res);
});

app.use(express.static(__dirname + '/docs'));


app.listen(process.env.PORT || app.get('port'), function(){
	console.log("server is listening");
});
