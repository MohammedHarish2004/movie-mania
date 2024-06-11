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
        const movie = await Movie.find({
            ...(req.query.genre && {genre:req.query.genre}),
            ...(req.query.theme && {theme:req.query.theme}),
            ...(req.query.searchTerm)&&{name:{$regex:req.query.searchTerm,$options:'i'}}
        })
        res.status(200).json(movie)

    } 
    
    catch (error) {
        next(error)    
    }
}

export const deleteMovie = async(req,res,next)=>{
    
    if(!req.user.isAdmin) return next(errorHandler(401,'Only admin allowed'))

        try {
            await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json('Movie deleted successfully')
        } 
        catch (error) {
            next(error)    
        }
}