import { Checkbox, Label } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload } from "react-icons/fa";
import bg from '../assets/stream.jpg'

export default function CreateMovie() {

    const fileRef = useRef(null)
    const [file,setFile] = useState({})
    const[genres,setGenres] = useState('')
    const [formData,setFormData] = useState({})
    console.log(formData);
    useEffect(()=>{
        const fetchGenres = async ()=>{
            const res = await fetch('/api/genre/getGenre')
            const data = await res.json()

            if(res.ok){
                setGenres(data)
            }
        }
        fetchGenres()
    },[])

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
  return (
        <div className='max-w-5xl w-full p-7'>
            <h1 className='text-3xl'>Create Movie</h1>
            <form>
                <div className='flex flex-col md:flex-row gap-6 mt-7'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Movie Name</Label>
                        <input
                            placeholder='genre name'
                            id='name'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Theme</Label>
                        <select
                            id='theme'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        >
                            <option>Select Theme</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Genre</Label>
                        <select
                            onChange={handleChange}
                            id='genre'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300 '
                            style={{ backgroundColor: 'rgb(7, 9, 15)' }}
                        >
                            <option>Select Genre</option>
                            {genres &&
                            genres.map((genre)=>(
                                <option key={genre._id} value={genre.name}>{genre.name}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 mt-7'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Trailer URL</Label>
                        <input
                            placeholder='trailer url'
                            id='url'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Age</Label>
                        <input
                            type='number'
                            placeholder='age'
                            id='age'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Year</Label>
                        <input
                            type='number'
                            placeholder='year'
                            id='year'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 mt-7'>
                    
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Description</Label>
                        <textarea
                            type='text'
                            rows='4'
                            placeholder='description'
                            id='description'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1 flex-col lg:flex-row gap-5'>
                        <input type="file" hidden onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}/>
                        <div className='border-2 border-dashed p-4 flex flex-col justify-center items-center' onClick={()=>fileRef.current.click()}>
                            <FaUpload className='w-20 h-20 '/>
                            <span className='pt-3 font-medium '>Upload Image</span>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <img src={bg} alt="" className='w-full h-36 mt-2 lg:mt-0'/>
                    </div>
                </div>  
                <div className='flex gap-2 mt-4'>
                        <Checkbox type="checkbox" className='w-6 h-6 bg-gray-950'/>
                        <Label className='text-white text-base'>Trending</Label>
                </div>
                <div>
                    <button
                        type='submit'
                        className='bg-yellow-300 w-full  hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 mt-6 uppercase flex justify-center gap-2 items-center'
                    >
                        <span>Create Movie</span>
                    </button>
                </div>
            </form>
        </div>
  )
}
