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

var totalPartition = 10;
var currentPartition = 0;

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

app.get('/testing', function(req, res){
	req.session.steamID = '76561198021742536';
	res.redirect("/");
});

app.get('/account', function(req, res){
	return res.json({"steamID": req.session.steamID , "sessionID": req.sessionID});
});

app.get('/updategames', function(req, res){
	gameDBSetup = false;
	updateGames();
});

//updateGames();

function updateGames(callback){
	var url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
	request(url, function(err, res, body){
		let gameJson = JSON.parse(body);
		databaseServiceObj.createGameEntry(gameJson['applist']['apps'], function(data){
			if(data==="finished"){
				callback(true);
			}
		});
	});
}

//intervalUpdateCurrentPlayer();

function intervalUpdateCurrentPlayer(){
	updatecurrentPlayers(currentPartition,totalPartition);
	currentPartition++;
	if(currentPartition>=totalPartition) currentPartition=0;
	setTimeout(intervalUpdateCurrentPlayer, (3600/totalPartition)*1000);
}

function updatecurrentPlayers(number, total){
	databaseServiceObj.findGame(function(data){
		let starting = Math.floor((number/total) * data.length);
		let ending = Math.floor(((number+1)/total) * data.length);
		(function loop(i, end, data){
			setTimeout(function(){
				updatePlayerCount(data[i]);
				i++;
				if(i<end && i<data.length){
					loop(i, end, data);
				}
			}, 50);
		})(starting, ending, data);
		function updatePlayerCount(result){
			let url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=' + result.appid;
			request(url, function(err, res, body){
				if(!res){ updatePlayerCount(result); }
				else if(res.statusCode == 200){
					let currentPlayerJSON = JSON.parse(body);
					let currentPlayerCount = 0;
					if(currentPlayerJSON['response']['result'] == 1){
						currentPlayerCount = currentPlayerJSON['response']['player_count'];
					}
					let currentPlayer = {"player_count":currentPlayerCount};
					databaseServiceObj.updateGameEntry(currentPlayer, result.appid, function(data){
					});
				}
				else{
					let currentPlayer = {"player_count":-1};
					databaseServiceObj.updateGameEntry(currentPlayer, result.appid, function(data){
					});
				}
			});
		}
	});
}

app.get('/games', function(req, res){
		databaseServiceObj.findGame(function(data){
			res.send(data);
		});
});

app.get('/signout', function(req, res){
	req.session.steamID = '';
	res.redirect("/");
});

app.use('/allgames', function(req, res){
	//var url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';
	//request(url).pipe(res);
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

app.use(express.static(__dirname + '/../docs'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/docs/index.html', { root: __dirname + '/../'});
});


MongoClient.connect(url, function(err, database){
	var db = database.db("steamCheck");
	app.listen(process.env.PORT || 4200, function(){
		console.log("server is listening");
	});
	databaseServiceObj = new databaseService(db)
	/*updateGames(function(data){
		if(data){
			intervalUpdateCurrentPlayer();
		}
	});*/
});
