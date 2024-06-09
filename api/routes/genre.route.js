import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createGenre } from '../controllers/genre.controller.js';

const router = express.Router()

router.post('/create',verifyToken,createGenre)

export default router;