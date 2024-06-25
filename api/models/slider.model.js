import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    theme:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const Slider = mongoose.model('Slider',sliderSchema)
export default Slider