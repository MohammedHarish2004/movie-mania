import Movie from "../models/movie.model.js"
import { errorHandler } from "../utils/error.js"

export const createMovie = async(req,res,next)=>{
    
    if(!req.user.isAdmin) return next(errorHandler(401,'Only admin allowed'))
    
    try {
        if(!req.body) return next(errorHandler(401,'All fields required'))
        const movie = new Movie(req.body)
        await movie.save()
        res.status(200).json(movie)

    } 
    
    catch (error) {
        next(error)    
    }
}

export const getMovie = async(req,res,next)=>{
    
    if(!req.user.isAdmin) return next(errorHandler(401,'Only admin allowed'))
    
    try {
        const movie = await Movie.find()
        res.status(200).json(movie)

    } 
    
    catch (error) {
        next(error)    
    }
}