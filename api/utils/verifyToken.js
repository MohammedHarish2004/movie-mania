import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = async (req,res,next)=>{

    const token = req.cookies.access_token

    if(!token) return next(errorHandler(401,'Unauthorized Login again'))
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            next(errorHandler('Forbidden'))
        }
        req.user = user
        next()
    })
}