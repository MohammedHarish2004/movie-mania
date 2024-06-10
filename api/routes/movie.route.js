import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createMovie } from '../controllers/movie.controller.js'

const router = express.Router()

router.post('/createMovie',verifyToken,createMovie)

export default router