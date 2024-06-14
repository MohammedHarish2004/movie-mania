import { Checkbox, Label, Spinner } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreateMovie() {

    const fileRef = useRef(null)
    const [file,setFile] = useState({})
    const[progress,setProgress] = useState(0)
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const[genres,setGenres] = useState('')
    const [formData,setFormData] = useState({
        name:'',
        theme:'',
        genre:'',
        url:'',
        image:'',
        age:16,
        rating:6.5,
        year:2024,
        duration:180,
        description:'',
        trending:false,
        newRelease:false
    })

    // Image upload 

    useEffect( () => {
        if(file) {
          handleFileUpload(file);
        }
      }, [file]);
    
      const handleFileUpload = (file) => {
    
        try {

            setLoading(true)
            const storage = getStorage(app)
            const newFile = new Date().getTime() + file.name
            const storageRef = ref(storage,newFile)
            const uploadTask = uploadBytesResumable(storageRef,file)
        
            uploadTask.on('state_changed',
            (snapshot)=>{
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setProgress(Math.round(progress))
              console.log(progress);
            },
            (error)=>{
              toast.error('Error while uploading (Image must be less than 2mb)')
              setLoading(null)
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setFormData({
                  ...formData,
                  image:downloadURL
                })
                setLoading(false)
                setProgress(null)
              })
            }
            )
          } 
          
          catch (error) {
            toast.error(error)  
            setProgress(null)
            setLoading(false)
          }
    
      };
    

    useEffect(()=>{
        const fetchGenres = async ()=>{
            const res = await fetch('/api/genre/getGenre')
            const data = await res.json()

            if(res.ok){
                setGenres(data.genres)
            }
        }
        fetchGenres()
    },[])

    

    const handleChange = (e)=>{
        if(e.target.id === 'trending' || e.target.id === 'newRelease'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }

        if(e.target.type === 'text' || e.target.type === 'number' || e.target.id === 'genre' || e.target.id === 'theme' || e.target.id === 'description'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(!formData.name?.trim() || 
           !formData.theme || 
           !formData.genre || 
           !formData.url?.trim() || 
           !formData.age ||  
           !formData.year ||  
           !formData.rating ||  
           !formData.description?.trim() ||
           !formData.image 
        ){
            toast.error('All fields required',{ autoClose: 1500 });
        }

        try {
        
            const res = await fetch('/api/movie/createMovie',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })

            const data = await res.json()

            if(data.success === false){
                toast.error(data.message,{ autoClose: 2000 });
                return
            }

            toast.success('Movie Created successfully',{autoClose:1500})
            navigate('/dashboard?tab=movie-list',{replace:true})
            
        } 
        
        catch (error) {
            toast.error(error,{autoClose:1500})
        }
    }
  return (
        <div className='max-w-5xl w-full p-7'>
            <h1 className='text-3xl'>Create Movie</h1>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className='flex flex-col md:flex-row gap-6 mt-7'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Movie Name</Label>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            placeholder='movie name'
                            id='name'
                            type='text'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Theme</Label>
                        <select
                            onChange={handleChange}
                            id='theme'
                            value={formData.theme}
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                            style={{ backgroundColor: 'rgb(7, 9, 15)' }}
                        >
                            <option>Select Theme</option>
                            <option value="movie">Movie</option>
                            <option value="anime">Anime</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Genre</Label>
                        <select
                            onChange={handleChange}
                            value={formData.genre}
                            id='genre'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300 '
                            style={{ backgroundColor: 'rgb(7, 9, 15)' }}
                        >
                            <option>Select Genre</option>
                            {genres &&
                            genres.map((genre)=>(
                                <option key={genre._id} value={genre.name.toLowerCase()}>{genre.name}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 mt-7'>
                    <div className='flex-none flex flex-col gap-1 '>
                        <Label className='text-white text-base'>Trailer URL</Label>
                        <input
                            onChange={handleChange}
                            value={formData.url}
                            placeholder='trailer url'
                            id='url'
                            type='text'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex-col gap-1 mt-1'>
                        <Label className='text-white text-base'>Age</Label>
                        <input
                            onChange={handleChange}
                            value={formData.age}
                            type='number'
                            placeholder='age'
                            id='age'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex-col gap-1 mt-1'>
                        <Label className='text-white text-base'>Year</Label>
                        <input
                            onChange={handleChange}
                            value={formData.year}
                            type='number'
                            placeholder='year'
                            id='year'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex-col gap-1 mt-1'>
                        <Label className='text-white text-base'>Rating</Label>
                        <input
                            onChange={handleChange}
                            value={formData.rating}
                            type='text'
                            placeholder='rating'
                            id='rating'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300 '
                        />
                    </div>
                    <div className='flex-1 flex-col gap-1 mt-1'>
                        <Label className='text-white text-base'>Duration</Label>
                        <input
                            onChange={handleChange}
                            value={formData.duration}
                            type='text'
                            placeholder='duration'
                            id='duration'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                </div>
                
                <div className='flex flex-col md:flex-row gap-6 mt-8'>
                    
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Description</Label>
                        <textarea
                            onChange={handleChange}
                            value={formData.description}
                            type='text'
                            rows='4'
                            placeholder='description'
                            id='description'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex-col lg:flex-row gap-5 cursor-pointer'>
                        <input type="file" hidden onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}/>
                        <div className='border-2 border-dashed p-4 flex flex-col justify-center items-center' onClick={()=>fileRef.current.click()}>
                            <FaUpload className='w-20 h-20 '/>
                            <span className='pt-3 font-medium '>Upload Image</span>
                        </div>
                    </div>
                   {
                    progress > 0 && progress < 100 &&
                    <div className='mt-4' style={{ width: 100, height: 100 }}>
                        <CircularProgressbar value={progress} text={`${progress}%`} />
                    </div>
                   }
                    
                    {
                    formData.image && 
                    <div className='flex-1'>
                        <img src={formData.image} className='w-auto h-72 mt-2 lg:mt-0'/>
                    </div>
                   }
                </div>  
               <div className='flex gap-4 mt-3'>
                    <div className='flex gap-2 mt-4'>
                        <Checkbox 
                        id='trending' 
                        checked={formData.trending}
                        type="checkbox" 
                        className='w-6 h-6 bg-gray-950'
                        onChange={handleChange}/>
                        <Label className='text-white text-base'>Trending</Label>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <Checkbox 
                        id='newRelease' 
                        checked={formData.newRelease}
                        type="checkbox" 
                        className='w-6 h-6 bg-gray-950' 
                        onChange={handleChange}
                        />
                        <Label className='text-white text-base'>New Release</Label>
                    </div>
               </div>
                <div>
                    <button
                        type='submit'
                        className='bg-yellow-300 w-full  hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 mt-6 uppercase flex justify-center gap-2 items-center'
                        disabled={loading}
                    >
                        <span>{
                        loading ? 
                        <span>
                            <Spinner size='sm' color='gray'/>Uploading...</span> : 'Create Movie'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
  )
}
