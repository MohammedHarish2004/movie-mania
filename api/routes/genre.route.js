import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createGenre ,getGenre ,deleteGenre, editGenre } from '../controllers/genre.controller.js';

const router = express.Router()

router.post('/createGenre',verifyToken,createGenre)
router.post('/editGenre/:id',verifyToken,editGenre)
router.get('/getGenre',getGenre)
router.delete('/deleteGenre/:id',verifyToken,deleteGenre)
export default router;