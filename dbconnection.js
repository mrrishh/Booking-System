async function dbConnection(){
  
    const Model= await require('./Model/')
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const url = 'mongodb://localhost:27017';
    
  // Database Name
  const dbName = 'CBdatabase';
  
  
   
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to database server");
   const dbo=client.db(dbName);
    global.db = dbo;
   // created schema
//    model.createModel();
   Model.UserModel.createUserModel();
   console.log("User Model Successfully Created !!!!")
   Model.BookingModel.createBookingModel();
   console.log("Booking Model Successfully Created !!!!")
  
  });
  
  }
module.exports={
dbConnection:dbConnection
}  