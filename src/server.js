const dotenv = require('dotenv')
const app = require('./app.js')
const config = require("../src/config/index.js")
const MongoDB = require("./utils/mongodb.util.js")

dotenv.config();

async function startServer(){
  try{
    await MongoDB.connect(config.db.uri);
    console.log("connect to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () =>{
      console.log(`server id running on port ${PORT}`)
    });
  }catch(error){
    console.log("cannot connect to the database!", error);
    process.exit();
  }
}

startServer();
