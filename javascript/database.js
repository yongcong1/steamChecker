var  db;

class DatabaseService{
  constructor(database){
    db = database;
  }

  findGame(callback){
    let games = db.collection('games');
    games.find({} , {projection:{ _id: 0 }}).sort({appid:1}).toArray(function(err, cursor){
      return callback(cursor);
    });
  }

  updateGameEntry(updateObj, appid, callback){
    let games = db.collection('games');
    games.updateOne({"appid": appid}, {"$set": updateObj}, function(err, data){
      console.log("player count updated for " + appid);
    });
  }

  createGameEntry(listOfGames, callback){
    let games = db.collection('games'), bulkUpdatedOps = [];
    games.createIndex({ appid: 1});
    listOfGames.forEach(function(data){
      bulkUpdatedOps.push({ "updateOne" : {
        "filter" : {"appid" : data.appid},
        "update" : data,
        "upsert" : true,}
      });
      if(bulkUpdatedOps.length === 500){
        games.bulkWrite(bulkUpdatedOps).then(function(r){

        });
        bulkUpdatedOps = [];
      }
    })
    if(bulkUpdatedOps.length > 0){
      games.bulkWrite(bulkUpdatedOps).then(function(r){});
    }
    return callback("finished");
  }
}

module.exports = DatabaseService;
