const mongoose = require('mongoose');
// const Chatroom=mongoose.model('Chatroom');
const Reform = mongoose.model('Reform');

exports.createReform = async (req, res) => {
    const text = req.body.text;
    const uploader = req.body.uploader;
    const department = req.body.department;
    console.log("chatroomcontoller-->", req.payload)

    // const chatroomExists=await Chatroom.findOne({name});
    // if(chatroomExists) throw "Already exists..!";
    const reform = new Reform({
        uploader, text, department
    });
    await reform.save();

    res.json({
        message: "Reform created successfully",
    })

}

exports.getAllReforms = async (req, res) => {
    console.log("here");
    const reforms = await Reform.find({});
    res.json(reforms)
}

exports.upvoteReform = async (req, res) => {
    try {
        const reformID = req.body.reformID;
        const userID = req.body.userID;
        const reform = await Reform.findOne({ _id: reformID });
        const arr1=reform.upvoters;
        const arr2=reform.downvoters;
        if(arr1.indexOf(userID)!=-1 || arr2.indexOf(userID)!=-1){
            console.log('Already upvoted');
            res.json({
                message:'Already upvoted'
            })
            throw 'Already upvoted'
        };
        reform.upvoters.push(userID);
        await reform.save();
        res.json({
            message:"Upvoted successfully"
        })
    } catch (error) {
        console.log("Error occured")
        res.json(error.message);
    }
}


exports.downvoteReform = async (req, res) => {
    try {
        const reformID = req.body.reformID;
        const userID = req.body.userID;
        const reform = await Reform.findOne({ _id: reformID });
        const arr1=reform.upvoters;
        const arr2=reform.downvoters;
        if(arr1.indexOf(userID)!=-1 || arr2.indexOf(userID)!=-1){
            console.log('Already upvoted');
            res.json({
                message:'Already downvoted'
            })
            throw 'Already upvoted'
        };
        reform.downvoters.push(userID);
        await reform.save();
        res.json({
            message:"Downvoted successfully"
        })
    } catch (error) {
        console.log("Error occured")
        res.json(error.message);
    }
}