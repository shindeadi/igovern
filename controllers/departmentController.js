const mongoose=require('mongoose');
// const Chatroom=mongoose.model('Chatroom');
const Department=mongoose.model('Department');

exports.createDepartment=async (req,res)=>{
    const name=req.body.name;
    

    // const chatroomExists=await Chatroom.findOne({name});
    // if(chatroomExists) throw "Already exists..!";
    const department=new Department({
        name
    });
    await department.save();

    res.json({
        message:"Department created successfully",
    })

}

exports.getAllDepartments=async (req,res)=>{
    console.log("here");
    const departments=await Department.find({});
    res.json(departments)
}