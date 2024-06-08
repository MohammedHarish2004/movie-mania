import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const register = async (req,res,next)=>{

    try {
        const {username,password} = req.body
        const hashedPassword = bcryptjs.hashSync(password,10)
        const newUser = new User({username,password:hashedPassword})
        await newUser.save()
        res.status(200).json('User Registered Successfully')
    } 
    catch (error) {
    if(error.code == 11000){
        next(errorHandler(403,'Username already existed'))
    }   
    next(error); 
    }
    
}

export const login = async(req,res,next) =>{
    try {
        const {username,password} = req.body

        const validUser = await User.findOne({username})
        if(!validUser) return next(errorHandler(401,'Invalid username'))

        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong Password'))
        
        const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)
        
        const {password:pass,...rest} = validUser._doc

        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    catch (error) {
        next(error);
    }
}

export const logout = async(req,res,next)=>{
    res.clearCookie('access_token')
    .status(200)
    .json('Logged Out Successfully')
}