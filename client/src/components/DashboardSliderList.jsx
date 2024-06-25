import React, { useEffect, useState } from 'react'
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function DashboardSliderList() {
    
    const navigate = useNavigate()
    const [sliders,setSliders] = useState('')
    const {currentUser} = useSelector(state=>state.user)
    const [formData,setFormData] = useState({searchTerm:''})
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [totalSliders,setTotalSliders] = useState()

    const fetchSliders = async(page=1,searchTerm='')=>{

        const res = await fetch(`/api/slider/getSlider?limit=8&page=${page}&searchTerm=${searchTerm}`)
        const data = await res.json()
        setSliders(
            data.sliders,
            setTotalSliders(data.totalSliders),
            setCurrentPage(data.currentPage),
            setTotalPages(data.totalPages)
        ) 
    }


    // Handle search
    useEffect(()=>{

        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromURL = urlParams.get('searchTerm')

        if(searchTermFromURL){
            setFormData({
                searchTerm:searchTermFromURL
            })
            fetchSliders(currentPage,searchTermFromURL)
        }
        else{
            fetchSliders()
        }
    },[])

    // Search submit

    const handleSearch = (e)=>{
        e.preventDefault()
        const searchTerm = formData.searchTerm.trim()
        navigate(`/dashboard?tab=slider-list&searchTerm=${searchTerm}`)
        fetchSliders(currentPage,searchTerm)
        setFormData({
            searchTerm:''
        })
    }

    useEffect(()=>{
        if(currentUser.isAdmin){
            fetchSliders()    
        }
    },[currentUser])


     // Delete Genre
     const handleDelete = async(movieId,movieName)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: `Want to delete ${movieName}`,
            icon: 'error',
            color:'#fff',
            background:"rgb(58, 58, 58)",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete !',
          }).then(async(result)=>{
      
            if(result.isConfirmed){

                try {
                    
                    const res = await fetch(`/api/slider/deleteSlider/${movieId}`,{
                        method:"DELETE"
                    })
    
                    const data = await res.json()
    
                    if(data.success === false){
                        toast.error(data.message,{ autoClose: 1000 })
                    }

                    if(res.ok){
                        toast.success('Slider deleted successfully',{ autoClose: 1000 })
                        setSliders(prev=>prev.filter((movie)=>movie._id !== movieId))
                        fetchSliders()
                    }

                } 
                catch (error) {
                    toast.error(error.message,{ autoClose: 1000 })
                }
            }
        })
    }

  return (
    <div className=' w-full p-7 flex flex-col gap-10'>
          <div className='overflow-auto '>
           <h1 className='text-3xl mt-3'>Slider Lists</h1>
           <div className='flex justify-between'>
                <p className='text-xl font-medium my-6'>Total sliders : {totalSliders}</p>
                <form onSubmit={handleSearch} autoComplete='off'>
                    <div className='flex justify-end gap-2 my-4'>
                        <input onChange={(e)=>setFormData({...formData,searchTerm:e.target.value})} placeholder='Search...' id='search' value={formData.searchTerm} className='bg-transparent block p-2 rounded-lg w-[150px] sm:w-auto outline-none border border-yellow-300' />
                        <button  className='bg-yellow-300 hover:bg-yellow-300 text-black p-2 px-2 rounded-lg font-bold transition delay-50 hover:opacity-85  disabled:opacity-80 uppercase flex items-center gap-1'><FaSearch /></button>
                    </div>
                </form>
            </div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Theme</th>
                        <th>Image</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sliders && sliders.length > 0 ?
                        sliders.map((movie)=>(
                            <tr key={movie._id} >
                                <td className='max-w-40 truncate'>{movie.name}</td>
                                <td className='capitalize'>{movie.genre}</td>
                                <td className='capitalize'>{movie.theme}</td>
                                <td><img src={movie.image} alt="movie poster" className='w-full h-20 object-contain'/></td>
                                <td><Link to={`/edit-slider/${movie._id}`}  className='text-green-400'>Edit</Link></td>
                                <td><button onClick={()=>handleDelete(movie._id,movie.name)} className='text-red-600'>Delete</button></td>
                            </tr>
                        ))
                        :
                            <tr>
                                <td colSpan='10' align='center'>No slider found!</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>

        {/* Pagination controls */}

        <div className='flex justify-center items-center gap-5 mt-4'>
            <button  
            onClick={()=>fetchSliders(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'>
                Previous
            </button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <button  
            onClick={()=>fetchSliders(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'>
                Next
            </button>
        </div>
    </div>
  )
}
