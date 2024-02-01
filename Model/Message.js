const mongodb=require('mongoose');

const messageSchemma=new mongodb.Schema({
    senderId:{type:String,required:true},
    conversationId:{type:String,required:true},
    text:{type:String,required:true}
},{timestamps:true})

module.exports=mongodb.model("Message",messageSchemma);