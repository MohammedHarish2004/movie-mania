import { Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardGenre() {

    const [formData,setFormData] = useState('')
    const {currentUser} = useSelector(state=>state.user)
    const [genres,setGenres] = useState()

    const handleSubmit = async(e)=>{

        e.preventDefault()

        if(!formData.name?.trim()) return toast.warning('Name required',{ autoClose: 1500 })
        try {
            
            const res = await fetch('/api/genre/create',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })

            const data = await res.json()
            if(data.success == false){
                toast.warning(data.message,{ autoClose: 1500 })
                return
            }
            toast.success('Genre created successfully',{ autoClose: 1000 })
            setFormData({name:''})
        } 
        catch (error) {
        toast.warning(error.message,{ autoClose: 1500 })
        }
    }

    useEffect(()=>{

        const fetchGenres = async()=>{
            const res = await fetch('/api/genre/getGenre')
            const data = await res.json()
            if(res.ok){
                setGenres(data)
            }
        }

        if(currentUser.isAdmin){
            fetchGenres()
        }
    },[])
  return (
    <div className='max-w-4xl w-full p-5 flex flex-col gap-10'>

        {/* Genre Creation */}
        <div>
            <h1 className='text-3xl my-7'>Create Genre</h1>
            <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row lg:gap-4 lg:justify-center lg:items-center '>
                <div className='flex-1 flex flex-col gap-1'>
                    <Label className='text-white text-base'>Genre Name</Label>
                    <input onChange={(e)=>setFormData({
                        ...formData,[e.target.id]:e.target.value
                    })} 
                    placeholder='genre name'
                    value={formData.name} 
                    id='name' 
                    className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
                </div>
                <div className='flex-1'>
                    <button className='bg-yellow-300 w-auto px-7 lg:w-72 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 mt-6 uppercase flex justify-center gap-2 items-center' >
                    {/* {loading ? 
                    <> */}
                    {/* <Spinner size='sm' color='gray'/>
                    <span>Updating</span>
                    </>
                    : */}
                    <span>Create Genre</span>
                    {/* } */}
                    </button>
                </div>
            </form>
        </div>

        {/* Genre list */}

        <div className='overflow-auto '>
            <h1 className='text-3xl my-7'>Genre Lists</h1>
            <table className='w-full '>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Genres</th>
                        <th>Created At</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {genres && 
                   genres.map((genre,index)=>(
                    <tr key={genre._id}>
                        <td>{index + 1}</td>
                        <td>{genre.name}</td>
                        <td>{new Date(genre.createdAt).toLocaleDateString()}</td>
                        <td><button className='text-green-400 '>Edit</button></td>
                        <td><button className='text-red-600 '>Delete</button></td>
                    </tr> 
                   ))
                   }
                </tbody>
            </table>
        </div>
    </div>
  )
}
