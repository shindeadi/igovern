const mongo=require('mongoose');

const userSchema=new mongo.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
        
    },
    isAdmin:{
        type:Boolean
    }
},{
    timestamps:true
});

module.exports=mongo.model("User",userSchema);