import jwt from "jsonwebtoken"

const ensureAuthenticated = (req,res,next) =>{
    const auth = req.headers['authorization']
    if(!auth){
        return res
        .status(403)
        .json({message:'unauthorized,jwt token is required'})
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET)
        req.user = decoded   
        next()
    } catch (error) {
        return res
        .status(401)
        .json({message:'unauthorized,jwt token wrong or expired'})
    }
}

export default ensureAuthenticated;