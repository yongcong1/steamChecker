const express = require('express');
const app = express();
const session = require('express-session')
const request = require('request');
const openid = require('openid');
const databaseService = require('./database')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

var databaseServiceObj;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(
	{
		secret: 'sample',
		resave: true,
		saveUninitialized: true,
		cookie: { secure:false },
		steam64id: ''
	}
));

app.set('port', 4200 || process.env.PORT);

var addr = "http://steamchecker.info/";

//var addr = "http://localhost:4200";

relyingParty = new openid.RelyingParty(
	addr + "verify",
	addr,
	true,
	true,
	[]
);

//var apiCallURL = "/dev"; //proxy config for local development

var apiCallURL = ""; //Production does not need proxy config


app.use(apiCallURL + '/Auth', function(req, res) {
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

app.use(apiCallURL + '/Verify', function(req, res) {
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

app.get(apiCallURL+'/account', function(req, res){
	return res.json({"steamID": req.session.steamID , "sessionID": req.sessionID});
});

app.get(apiCallURL+'/signout', function(req, res){
	req.session.steamID = '';
	res.redirect("/");
});

app.get(apiCallURL+'/updategames', function(req, res){
	updateGames();
	res.redirect("/");
});

function updateGames(){
	var url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
	request(url, function(err, res, body){
		let gameJson = JSON.parse(body);
		databaseServiceObj.createGameEntry(gameJson['applist']['apps'], function(data){
		});
	});
}

app.get(apiCallURL+'/db/games', function(req, res){
		databaseServiceObj.findGames(1, function(data){
			res.send(data);
		});
});

app.get(apiCallURL+'/db/gameDetail/:appid', function(req, res){
	let appid = req.params.appid;
	databaseServiceObj.findGamebyID(appid, function(data){
		res.send(data);
	});
});

app.get(apiCallURL+'/db/navbarGameList', function(req, res){
	databaseServiceObj.navbarFindGame(function(data){
		res.send(data);
	});
});

app.get(apiCallURL+'/api/customURL/:param', function(req, res) {
	let param = req.params.param;
	var url = 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?'+ 'key=' + apiKey  + param;
	request(url).pipe(res);
});

app.get(apiCallURL+'/api/userSummary/:param', function(req, res) {
	let param = req.params.param;
	var url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?'+ 'key=' + apiKey + param;
	request(url).pipe(res);
});

app.get(apiCallURL+'/api/userStats/:param', function(req, res) {
	let param = req.params.param;
	var url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'+ 'key=' + apiKey  + param;
	request(url).pipe(res);
});

app.get(apiCallURL+'/api/friendList/:param', function(req, res) {
	let param = req.params.param;
	var url = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?'+ 'key=' + apiKey + param;
	request(url).pipe(res);
});

app.get(apiCallURL+'/api/steamGameDetail/:param', function(req, res){
	let param = req.params.param;
	var url = 'https://store.steampowered.com/api/appdetails?' + param;
	request(url).pipe(res);
});


if(apiCallURL==""){
	app.use(express.static(__dirname + '/../docs'));

	app.all('/*', function(req, res, next) {
	    res.sendFile('/docs/index.html', { root: __dirname + '/../'});
	});
}


MongoClient.connect(url, { useNewUrlParser: true }, function(err, database){
	var db = database.db("steamCheck");
	app.listen(process.env.PORT || 4200, function(){
		console.log("server is listening");
	});
	databaseServiceObj = new databaseService(db);
});
