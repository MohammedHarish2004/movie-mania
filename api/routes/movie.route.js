import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createMovie, getMovie } from '../controllers/movie.controller.js'

const router = express.Router()

router.post('/createMovie',verifyToken,createMovie)
router.get('/getMovie',verifyToken,getMovie)

export default router