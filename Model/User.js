const mongodb=require('mongoose');

const userScheema=new mongodb.Schema({
    username:{type:String,min:4,unique:true,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profile:{type:String,default:""},
    cover:{type:String,default:""},
    follower:{type:Array,default:[]},
    following:{type:Array,default:[]},
    isAdmin:{type:Boolean,default:false},
    desc:{type:String},
    city:{type:String},
    friends:{type:Number,enum:[1,2,3,4]}
},{timestamps:true})


module.exports=mongodb.model("Users",userScheema);