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
    
    
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 8
        const skip = ( page - 1 ) * limit
        const sort = req.query.order === 'asc' ? 1 : -1
        const filter = {
            ...(req.query.genre && {genre:req.query.genre}),
            ...(req.query.theme && {theme:req.query.theme}),
            ...(req.query.movieId && {_id:req.query.movieId}),
            ...(req.query.searchTerm)&&
            {$or:[{name:{$regex:req.query.searchTerm,$options:'i'}}
                ,{theme:{$regex:req.query.searchTerm,$options:'i'}}]}
        }
        const movies = await Movie.find(filter).sort({updatedAt:sort}).skip(skip).limit(limit)

        const totalMovies = await Movie.countDocuments(filter)

        res.status(200).json({
            movies,
            currentPage:page,
            totalPages:Math.ceil(totalMovies/limit),
            totalMovies
        })

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

export const editMovie = async(req,res,next)=>{
    
    if(!req.user.isAdmin) return next(errorHandler(401,'Only admin allowed'))

        try {
            const editMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.status(200).json(editMovie)
        } 
        catch (error) {
            next(error)    
        }
}

