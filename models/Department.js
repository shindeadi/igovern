const mongo=require('mongoose');

const departmentSchema=new mongo.Schema({
    name:{
        type:String
    }
    
});

module.exports=mongo.model("Department",departmentSchema);