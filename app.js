const express=require('express');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cross-origin
app.use(require('cors')());

//Routes
app.use('/user',require('./routes/user'));
app.use('/reform',require('./routes/reform'));
app.use('/department',require('./routes/department'));
app.use('/poll',require('./routes/poll'));


//Error handlers
const errorHandlers=require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if(process.env.ENV==="DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
}
else{
    app.use(errorHandlers.productionErrors);
}

module.exports=app;




// const express=require('express');


// const app=express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// //Cross-origin
// app.use(require('cors')());

// //Routes
// app.use('/user',require('./routes/user'));
// app.use('/chatroom',require('./routes/chatroom'));


// //Error handlers
// const errorHandlers=require('./handlers/errorHandlers');
// app.use(errorHandlers.notFound);
// app.use(errorHandlers.mongoseErrors);

// if(process.env.ENV==="DEVELOPMENT"){
//     app.use(errorHandlers.developmentErrors);
// }
// else{
//     app.use(errorHandlers.productionErrors);
// }

// module.exports=app;