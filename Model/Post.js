const mongodb=require('mongoose');
const postSchemma=new mongodb.Schema({
    userId:{type:String,required:true},
    desc:{type:String},
    likes:{type:Array,default:[]},
    img:{type:String}
},{timestamps:true});

module.exports=mongodb.model("Posts",postSchemma);