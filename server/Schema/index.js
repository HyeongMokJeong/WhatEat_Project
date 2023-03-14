const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      process.env.REACT_APP_MONGODB,{useNewUrlParser: true, dbName:'store'}, error => {
        if (error){
          console.log("[ERROR] Can't Connect to mongoDB");
          console.log(error);
        }
        else
          console.log("Connected to mongoDB"); 
      }
    );
  };
  connect();
  require("./store"); // 스키마 구성
};