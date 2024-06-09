import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async(req,res,next) =>{

    try {
        
        if(req.user.id !== req.params.id ){
            next(errorHandler(401,'You can only update your own account !'))
        }

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10) 
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            }
        },{new:true})

        const {password:pass,...rest} = updatedUser._doc

        res.status(200).json(rest)
    } 
    
    catch (error) {
       if(error.code === 11000 ){
        next(errorHandler(403,'Username already exist'))
       }
       next(error)    
    }
}

export const deleteUser = async (req,res,next) =>{

    try {
        if(req.user.id !== req.params.id ){
            next(errorHandler(401,'You can only delete only your own account'))
        }
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        .status(200)
        .json('Accoun deleted successfully')
    } 
    
    catch (error) {
     next(error)    
    }
}