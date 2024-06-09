import express from 'express'
import { register,login,logout,google } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/google',google)
router.get('/logout',logout)

export default router