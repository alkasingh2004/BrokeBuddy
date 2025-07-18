const {JWT_SECRET}=require("./config");
const jwt=require("jsonwebtoken");

 const authMiddleware=(req,res,next)=>{
    const header=req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token=header.split(' ')[1];

    try {
        const decoded= jwt.verify(token,JWT_SECRET);

        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({
            message:"something went wrong"
            });
        }
    } catch (error) {
        return res.status(403).json({});
    }
}

module.exports={
    authMiddleware
}