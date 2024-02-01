const mongoose = require("mongoose");

const dataBaseeConnection= ()=>{
    console.log();
    mongoose.connect(process.env.DATABASELOCALURL)
    .then(()=> console.log("database connected successfully"))
    .catch((err)=> console.log("database conncetion failed\n"+err))
}
module.exports=dataBaseeConnection;