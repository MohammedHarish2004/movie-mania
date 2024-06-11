import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createMovie, getMovie ,deleteMovie} from '../controllers/movie.controller.js'

const router = express.Router()

router.post('/createMovie',verifyToken,createMovie)
router.get('/getMovie',verifyToken,getMovie)
router.delete('/deleteMovie/:id',verifyToken,deleteMovie)

export default router