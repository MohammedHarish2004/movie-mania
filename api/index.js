import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import genreRouter from './routes/genre.route.js'
import movieRouter from './routes/movie.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
console.log(err.message);
})

const __dirname = path.resolve()

const app = express()

app.listen(3000,()=>{
    console.log('Server running on PORT 3000');
})

app.use(express.json())

app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/genre',genreRouter)
app.use('/api/movie',movieRouter)

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode
    const message = err.message
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
