import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createGenre ,getGenre ,deleteGenre } from '../controllers/genre.controller.js';

const router = express.Router()

router.post('/create',verifyToken,createGenre)
router.get('/getGenre',verifyToken,getGenre)
router.delete('/deleteGenre/:id',verifyToken,deleteGenre)
export default router;