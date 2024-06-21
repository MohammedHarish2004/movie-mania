import Movie from "../models/movie.model.js"
import User from "../models/user.model.js"
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

export const addToWatchlist = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie is already in the watchlist
        if (user.watchlist.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }

        // Add the movie to the user's watchlist
        user.watchlist.push(movieId);
        await user.save();

        res.status(200).json({ success: true, message: 'Movie added to watchlist' });
    } catch (error) {
        next(error);
    }
};


export const getWatchlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('watchlist');
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        res.status(200).json({ movies: user.watchlist });
    } catch (error) {
        next(error);
    }
};

    // Delete a movie from the watchlist
    export const deleteFromWatchlist = async (req, res, next) => {
        try {
            const { movieId } = req.body;
            const userId = req.user.id;

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the movie is in the watchlist
            if (!user.watchlist.includes(movieId)) {
                return res.status(400).json({ message: 'Movie not in watchlist' });
            }

            // Remove the movie from the user's watchlist
            user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
            await user.save();

            res.status(200).json({ success: true, message: 'Movie removed from watchlist' });
        } catch (error) {
            next(error);
        }
    };
