var  db;

class DatabaseService{
  constructor(database){
    db = database;
  }

  findGame(callback){
    let games = db.collection('games');
    games.find({'player_count.player_count':{$gte:1}} , {projection:{ _id: 0, 'player_count.time' : 0, player_count: {$slice:-1}}}).sort({appid:1}).toArray(function(err, cursor){
      return callback(cursor);
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
