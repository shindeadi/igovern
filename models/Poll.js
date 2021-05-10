const mongo=require('mongoose');

const pollSchema=new mongo.Schema({
    uploader:{
        type:mongo.Schema.Types.ObjectId,
        refer:"User"
    },
    text:{
        type:String
    },
    area:{
        type:String
    },
    department:{
        type:mongo.Schema.Types.ObjectId,
        refer:"User"
    },
    upvoters:[String],
    downvoters:[String]
});

module.exports=mongo.model("Poll",pollSchema);