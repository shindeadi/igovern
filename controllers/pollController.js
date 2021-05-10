const mongoose = require('mongoose');
// const Chatroom=mongoose.model('Chatroom');
const Poll = mongoose.model('Poll');

exports.createPoll = async (req, res) => {
    const text = req.body.text;
    const uploader = req.body.uploader;
    const department = req.body.department;
    const area = req.body.area;
    console.log("chatroomcontoller-->", req.payload)

    // const chatroomExists=await Chatroom.findOne({name});
    // if(chatroomExists) throw "Already exists..!";
    const poll = new Poll({
        uploader, text, area,department
    });
    await poll.save();

    res.json({
        message: "Poll created successfully",
    })

}

exports.getAllPolls = async (req, res) => {
    console.log("here");
    const polls = await Poll.find({});
    res.json(polls)
}

exports.upvotePoll = async (req, res) => {
    try {
        const pollID = req.body.pollID;
        const userID = req.body.userID;
        const poll = await Poll.findOne({ _id: pollID });
        const arr1=poll.upvoters;
        const arr2=poll.downvoters;
        if(arr1.indexOf(userID)!=-1 || arr2.indexOf(userID)!=-1){
            console.log('Already upvoted');
            res.json({
                message:'Already upvoted'
            })
            throw 'Already upvoted'
        };
        poll.upvoters.push(userID);
        await poll.save();
        res.json({
            message:"Upvoted successfully"
        })
    } catch (error) {
        console.log("Error occured")
        res.json(error.message);
    }
}


exports.downvotePoll = async (req, res) => {
    try {
        const pollID = req.body.pollID;
        const userID = req.body.userID;
        const poll = await Poll.findOne({ _id: pollID });
        const arr1=poll.upvoters;
        const arr2=poll.downvoters;
        if(arr1.indexOf(userID)!=-1 || arr2.indexOf(userID)!=-1){
            console.log('Already upvoted');
            res.json({
                message:'Already downvoted'
            })
            throw 'Already upvoted'
        };
        poll.downvoters.push(userID);
        await poll.save();
        res.json({
            message:"Downvoted successfully"
        })
    } catch (error) {
        console.log("Error occured")
        res.json(error.message);
    }
}