import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
console.log(err.message);
})

const app = express()

app.listen(3000,()=>{
    console.log('Server running on PORT 3000');
})