import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:'https://www.reelviews.net/resources/img/default_poster.jpg'
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
    mins:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    trending:{
        type:Boolean,
        required:true,
        default:false
    },
    newRelease:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Movie = mongoose.model('Movie',movieSchema)
export default Movie