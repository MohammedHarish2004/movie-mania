import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createMovie, getMovie ,deleteMovie,editMovie,
    addToWatchlist,getWatchlist,deleteFromWatchlist} from '../controllers/movie.controller.js'

const router = express.Router()

router.post('/createMovie',verifyToken,createMovie)
router.get('/getMovie',getMovie)
router.delete('/deleteMovie/:id',verifyToken,deleteMovie)
router.post('/editMovie/:id',verifyToken,editMovie)
router.post('/addToWatchlist', verifyToken, addToWatchlist);
router.get('/getWatchlist', verifyToken, getWatchlist);
router.post('/deleteFromWatchlist', verifyToken, deleteFromWatchlist);
export default router