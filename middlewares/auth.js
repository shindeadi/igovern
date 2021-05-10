const jwt=require('jwt-then');
module.exports=async (req,res,next)=>{
    try {
        console.log("req-->",req.body)
        if(!req.headers.authorization) throw "Forbidden..!";
        const token=req.headers.authorization.split(" ")[1];
        const payload=await jwt.verify(token,process.env.SECRET);
        req.payload=payload;
        console.log("auth-->",payload);
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message:"Forbidden..!"
        })
        
    }
}