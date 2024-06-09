import Genre from "../models/genre.model.js"
import { errorHandler } from "../utils/error.js"

export const createGenre = async (req,res,next)=>{

    try {
        
        if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed'))
        const genre = new Genre({name:req.body.name})
        await genre.save()
        res.status(200).json(genre)
    } 
    
    catch (error) {
        if(error.code === 11000){
            next(errorHandler(403,'Genre already created'))
        }
        next(error)
    }
}

export const getGenre = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed'))

       try {
        
        const genres = await Genre.find()
        res.status(200).json(genres)

       } 
       
       catch (error) {
        next(error)
       }

}