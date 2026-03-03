const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        res.status(401).json({error:"Unauthorized"});
        return;
    }
    
    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    try
    {    
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        console.log(decoded)
        req.userData={id:decoded.id,email:decoded.email};
        next()
    }
    catch(err)
    {
        res.status(401).json({error:"Unauthorized",message:err.message})
        return;
    }

}
module.exports=auth