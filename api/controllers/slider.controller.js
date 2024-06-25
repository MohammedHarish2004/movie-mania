import Slider from '../models/slider.model.js'
import { errorHandler } from '../utils/error.js'

export const createSlider = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(201,'Only admin allowed'))
    
        
        try {
        if(!req.body) return next(errorHandler(201,'All fields required'))
        const slider = new Slider(req.body)
        await slider.save()
        res.status(200).json(slider)
    } 
    
    catch (error) {
        next(error)
    }
}

export const getSlider = async(req,res,next)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = ( page - 1 ) * limit
        const filter = {
            ...(req.query.sliderId && {_id:req.query.sliderId}),
            ...(req.query.searchTerm && {
                $or: [
                    { name: { $regex: req.query.searchTerm, $options: 'i' } },
                    { theme: { $regex: req.query.searchTerm, $options: 'i' } },
                    { genre: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            })
        }
        
        const sliders = await Slider.find(filter).skip(skip).limit(limit)

        const totalSliders = await Slider.countDocuments(filter)

        res.status(200).json({
            sliders,
            currentPage:page,
            totalPages:Math.ceil(totalSliders/limit),
            totalSliders
        })
    } 
    
    catch (error) {
        next(error)
    }
}

export const editSlider = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(201,'Only admin allowed'))
    
    try {
        const editSlider = await Slider.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(editSlider)
    } 
    
    catch (error) {
        next(error)
    }
}

export const deleteSlider = async(req,res,next)=>{

    if(!req.user.isAdmin) return next(errorHandler(201,'Only admin allowed'))
    
    try {
        await Slider.findByIdAndDelete(req.params.id)
        res.status(200).json('Slider Deleted Successfully')
    } 
    
    catch (error) {
        next(error)
    }
}