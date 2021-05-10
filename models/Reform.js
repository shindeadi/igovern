const mongo=require('mongoose');

const reformSchema=new mongo.Schema({
    uploader:{
        type:mongo.Schema.Types.ObjectId,
        refer:"User"
    },
    text:{
        type:String
    },
    department:{
        type:mongo.Schema.Types.ObjectId,
        refer:"User"
    },
    upvoters:[String],
    downvoters:[String]
});

module.exports=mongo.model("Reform",reformSchema);