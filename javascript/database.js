var db;
class DatabaseService{
  constructor(database){
    db = database;
  }

  findGames(minNumberOfPlayer, callback){
    let games = db.collection('games');
    games.aggregate(
    [
    {$match : {'current_player':{$gte:minNumberOfPlayer}}} ,
    {$project:{ _id: 0, 'current_player': 1, 'appid': 1, 'name': 1, 'max_player_count':1}}
    ], function(err, result){ result.toArray(function(err, cursor){
      callback(cursor);
    })});
  }

  findGamebyID(gameAppID, callback){
    let games = db.collection('games');
    games.findOne({appid : parseInt(gameAppID)}, {fields:{ _id: 0}}, function(err, result){
      if(err){
      }
      callback(result);
    });
  }

  navbarFindGame(callback){
    let games = db.collection('games');
    games.find({}, {fields: { _id: 0, appid: 1, name: 1}}).sort({ appid: 1}).toArray(function(err, cursor){
      if(err){
      }
      callback(cursor);
  });
  }

  updateGameEntry(appList){
    let games = db.collection('games');
    let bulkUpdatedOps = [];
    for(let i=0, n=appList.length; i<n; i++){
      bulkUpdatedOps.push({ "updateOne" : {
        "filter" : {"appid" : appList[i].appid},
        "update" : {$push : {'player_count': {'player_count': appList[i].player_count, 'time':new Date()}}, $max:{ 'max_player_count': appList[i].player_count}},
        "upsert" : true,}
      });
      if(bulkUpdatedOps.length === 1000){
        games.bulkWrite(bulkUpdatedOps).then(function(r){

        });
        bulkUpdatedOps = [];
      }
    }
    if(bulkUpdatedOps.length > 0){
      games.bulkWrite(bulkUpdatedOps).then(function(r){});
    }
    console.log("finished");
  }

  createGameEntry(listOfGames){
    let games = db.collection('games'), bulkUpdatedOps = [];
    games.createIndex({ appid: 1});
    for(let game in listOfGames){
      bulkUpdatedOps.push({ "updateOne" : {
        "filter" : {"appid" : listOfGames[game].appid},
        "update" :  {$set : {"appid":listOfGames[game].appid, "name":listOfGames[game].name}},
        "upsert" : true,}
      });
      if(bulkUpdatedOps.length === 1000){
        games.bulkWrite(bulkUpdatedOps).then(function(r){

        });
        bulkUpdatedOps = [];
      }
    }
    if(bulkUpdatedOps.length > 0){
      games.bulkWrite(bulkUpdatedOps).then(function(r){});
    }
    console.log("update game finished");
  }
}

module.exports = DatabaseService;
