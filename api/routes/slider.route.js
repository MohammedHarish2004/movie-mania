import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createSlider,getSlider,editSlider, deleteSlider} from '../controllers/slider.controller.js'

const router = express.Router()

router.post('/createSlider',verifyToken,createSlider)
router.get('/getSlider',getSlider)
router.post('/editSlider/:id',verifyToken,editSlider)
router.delete('/deleteSlider/:id',verifyToken,deleteSlider)
export default router 