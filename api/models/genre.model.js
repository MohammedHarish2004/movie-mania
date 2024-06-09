import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})

export const Genre = mongoose.model('Genre',genreSchema)
export default Genre