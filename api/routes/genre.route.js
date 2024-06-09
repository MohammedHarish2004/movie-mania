import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createGenre ,getGenre } from '../controllers/genre.controller.js';

const router = express.Router()

router.post('/create',verifyToken,createGenre)
router.get('/getGenre',verifyToken,getGenre)
export default router;