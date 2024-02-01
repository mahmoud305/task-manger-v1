const { default: mongoose } = require("mongoose");

const itemSchema=new mongoose.Schema ({
    name:String,
    checked:{type:Boolean,default:false}
});
const listSchema=new mongoose.Schema({
    title:String,
    date: Date,
    items:[itemSchema]
});

 

module.exports={listSchema};