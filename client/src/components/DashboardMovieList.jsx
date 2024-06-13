import React, { useEffect, useState } from 'react'
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function DashboardMovieList() {
    
    const navigate = useNavigate()
    const [movies,setMovies] = useState('')
    const {currentUser} = useSelector(state=>state.user)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [totalMovies,setTotalMovies] = useState()
    const [formData,setFormData] = useState({searchTerm:''})
    const fetchMovies = async(page=1,searchTerm='')=>{
        const res = await fetch(`/api/movie/getMovie?page=${page}&limit=5&searchTerm=${searchTerm}`)
        const data = await res.json()
        setMovies(
            data.movies,
            setTotalMovies(data.totalMovies),
            setCurrentPage(data.currentPage),
            setTotalPages(data.totalPages)
        )
        
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')

        if(searchTermFromUrl){
            setFormData({
                searchTerm:searchTermFromUrl
            })
            fetchMovies(currentPage,searchTermFromUrl)
        }
        else{
            fetchMovies()
        }
    },[])

    const handleSearch =(e)=>{
        e.preventDefault()
        const searchTerm = formData.searchTerm.trim()
        navigate(`/dashboard?tab=movie-list&searchTerm=${searchTerm}`);
        fetchMovies(currentPage,searchTerm)
        setFormData({
            searchTerm:''
        })
    }

    useEffect(()=>{
    
        if(currentUser.isAdmin){
            fetchMovies()
        }

    },[])

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
                    
                    const res = await fetch(`/api/movie/deleteMovie/${movieId}`,{
                        method:"DELETE"
                    })
    
                    const data = await res.json()
    
                    if(data.success === false){
                        toast.error(data.message,{ autoClose: 1000 })
                    }

                    if(res.ok){
                        toast.success('Movie deleted successfully',{ autoClose: 1000 })
                        setMovies(prev=>prev.filter((movie)=>movie._id !== movieId))
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
           <h1 className='text-3xl mt-3'>Movie Lists</h1>
           <div className='flex justify-between'>
                <p className='text-xl font-medium my-6'>Total movies : {totalMovies}</p>
                <form onSubmit={handleSearch}>
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
                        <th>Trending</th>
                        <th>New Release</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies && movies.length > 0 ?
                        movies.map((movie)=>(
                            <tr key={movie._id} >
                                <td className='max-w-40 truncate '>{movie.name}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.theme}</td>
                                <td><img src={movie.image} alt="movie poster" className='w-full h-20 object-contain'/></td>
                                <td align='center'>{movie.trending ? <FaCheck className='text-green-400 flex justify-center'/> : <FaTimes className='text-red-600'/>}</td>
                                <td>{movie.newRelease ? <FaCheck className='text-green-400'/> : <FaTimes className='text-red-600'/>}</td>
                                <td><Link to={`/edit-movie/${movie._id}`}  className='text-green-400'>Edit</Link></td>
                                <td><button onClick={()=>handleDelete(movie._id,movie.name)} className='text-red-600'>Delete</button></td>
                            </tr>
                        ))
                        :
                            <tr>
                                <td colSpan='10' align='center'>Error on fetching movies</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>

        {/* Pagination controls */}

        <div className='flex justify-center items-center gap-5 mt-4'>
            <button  
            onClick={()=>fetchMovies(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'>
                Previous
            </button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <button  
            onClick={()=>fetchMovies(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'>
                Next
            </button>
        </div>
    </div>
  )
}
