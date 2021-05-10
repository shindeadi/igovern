/*
Validation remaining(Chatroom+user) 
*/
const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true,useUnifiedTopology: true });


mongoose.connection.on('error',(err)=>{
    console.log("MongoDB error"+err.message);
});

mongoose.connection.once('open',(err)=>{
    console.log("MongoDB connected");
})

require('./models/User');
require('./models/Reform');
require('./models/Department');
require('./models/Poll');
// require('./models/Message');
const app=require('./app');

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const server=app.listen(process.env.PORT,()=>{
    console.log("Server started at port "+process.env.PORT);
})

// const io=require('socket.io')(server,{
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   });
const jwt=require('jwt-then');
// // const Message=mongoose.model('Message');
const User=mongoose.model('User');

// io.use(async (socket,next)=>{
//     try{
//         const token=socket.handshake.query.token;
//         const payload=await jwt.verify(token,process.env.SECRET);
//         socket.userId=payload.id;
//         next();
//     }catch(err){

//     }
// });

// io.on('connection',(socket)=>{
//     // const token=socket.handshake.query.token;
//     console.log("Connected "+socket.userId);

//     socket.on('disconnect',()=>{
//         console.log("Disconnected "+socket.userId);
//     })

//     socket.on('joinRoom',({chatroomId})=>{
//         socket.join(chatroomId);
//         console.log("User has joined chatroom "+chatroomId);
//     })

//     socket.on('leaveRoom',({chatroomID})=>{
//         socket.leave(chatroomID);
//         console.log("User has left chatroom "+chatroomID);
//     })

//     socket.on('chatroomMessage',async ({chatroomId,message})=>{
//         console.log('message arrived',message);
//         const user=await User.findOne({_id:socket.userId});
//         const msg=new Message({
//             chatroom:chatroomId,
//             user:socket.userId,
//             message:message
//         })
//         io.to(chatroomId).emit('newMessage',{
//             message,
//             name:user.name,
//             userId:socket.userId,
//         })
//         await msg.save();
//     })
// })