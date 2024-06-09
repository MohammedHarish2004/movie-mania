import Genre from "../models/genre.model.js"
import { errorHandler } from "../utils/error.js"

export const createGenre = async (req,res,next)=>{

    try {
        
        if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed to create'))
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

    if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed to get'))

       try {
        const genres = await Genre.find()
        res.status(200).json(genres)
       } 
       catch (error) {
        next(error)
       }
}

export const editGenre = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed to edit'))

        const genre = await Genre.findById(req.params.id)
        if(!genre) return next(errorHandler(404,'Genres not found!'))

    try{
        const editGenre = await Genre.findByIdAndUpdate(req.params.id,req.body,{new:true })
        res.status(200).json(editGenre)
    }

    catch(error){
        next(error)
    }
}

export const deleteGenre = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(401,'Only Admin allowed to delete'))

       try {
        await Genre.findByIdAndDelete(req.params.id)
        res.status(200).json("Genre Deleted")
       } 
       catch (error) {
        next(error)
       }
}