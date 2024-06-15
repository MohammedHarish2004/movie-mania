import { Label } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function DashboardGenre() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', id: '' ,searchTerm:''});
    const { currentUser } = useSelector(state => state.user);
    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalGenres, setTotalGenres] = useState();
    const ScrollRef = useRef(null);

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setFormData(prev => ({ ...prev, searchTerm: searchTermFromUrl }));
            fetchGenres(currentPage, searchTermFromUrl);
        } else {
            fetchGenres();
        }
    },[])

    const handleSearch = (e)=>{
        e.preventDefault()
        const searchTerm = formData.searchTerm.trim();
        navigate(`/dashboard?tab=genre&searchTerm=${searchTerm}`);
        fetchGenres(currentPage, searchTerm);
    }
    
    // Get Genre
    const fetchGenres = async (page = 1,searchTerm='') => {
        const res = await fetch(`/api/genre/getGenre?page=${page}&limit=8&searchTerm=${searchTerm}`);
        const data = await res.json();
        if (res.ok) {
            setGenres(data.genres);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setTotalGenres(data.totalGenres)
        }
    }
    

    useEffect(() => {
        if (currentUser.isAdmin) {
            fetchGenres();
        }
    }, [currentUser.isAdmin]);
    
    
    // Delete Genre
    const handleDelete = async(genreId,genreName)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: `Want to delete ${genreName}`,
            icon: 'error',
            color:'#fff',
            background:"rgb(58, 58, 58)",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete !',
          }).then(async(result)=>{
      
            if(result.isConfirmed){

                try {
                    
                    const res = await fetch(`/api/genre/deleteGenre/${genreId}`,{
                        method:"DELETE"
                    })
    
                    const data = await res.json()
    
                    if(data.success === false){
                        toast.error(data.message,{ autoClose: 1000 })
                    }

                    if(res.ok){
                        toast.success('Genre deleted successfully',{ autoClose: 1000 })
                        setGenres(prev=>prev.filter((genre)=>genre._id !== genreId))
                    }

                } 
                catch (error) {
                    toast.error(error.message,{ autoClose: 1000 })
                }
            }
        })
    }

    // Edit Genre 

    const handleEdit = (genreId,genreName) =>{
        setFormData({id:genreId,name:genreName})
    }

    // Submit Genre 
    const handleSubmit = async(e)=>{

        e.preventDefault()

        if(!formData.name?.trim()) return toast.warning('Name required',{ autoClose: 1500 })
        try {
            
            const res = await fetch(
                formData.id ?
                `/api/genre/editGenre/${formData.id}`
                :'/api/genre/createGenre',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:formData.name})
            })

            const data = await res.json()
            if(data.success == false){
                toast.warning(data.message,{ autoClose: 1500 })
                return
            }
            toast.success(formData.id ? 'Genre updated successfully' : 'Genre created successfully',{ autoClose: 1000 })
            setFormData({name:'',id:''})
            fetchGenres()
        } 
        catch (error) {
        toast.error('Something went wrong',{ autoClose: 1500 })
        }
    }
    
    
  return (
        <div className='max-w-4xl w-full p-7 flex flex-col gap-10'>
            {/* Genre Creation */}
            <div>
                <h1 className='text-3xl my-7'>Create Genre</h1>
                <form onSubmit={handleSubmit} autoComplete='off' className='flex flex-col lg:flex-row lg:gap-4 lg:justify-center lg:items-center'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <Label className='text-white text-base'>Genre Name</Label>
                        <input
                            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
                            ref={ScrollRef}
                            placeholder='genre name'
                            value={formData.name}
                            id='name'
                            className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'
                        />
                    </div>
                    <div className='flex-1'>
                        <button
                            type='submit'
                            className='bg-yellow-300 w-auto px-7 lg:w-72 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 mt-6 uppercase flex justify-center gap-2 items-center'
                        >
                            <span>{formData.id ? 'Update Genre' : 'Create Genre'}</span>
                        </button>
                    </div>
                </form>
            </div>
    
            {/* Genre list */}
            <div className='overflow-auto'>
           
                <h1 className='text-3xl mt-3'>Genre Lists</h1>
                <div className='flex justify-between'>
                    <p className='text-lg font-medium my-6'>Total genres : {totalGenres}</p>
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
                            <th>S No.</th>
                            <th>Genres</th>
                            <th>Created At</th>
                            <th colSpan='2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres && genres.length > 0 ? (
                            genres.map((genre, index) => (
                                <tr key={genre._id}>
                                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                                    <td>{genre.name}</td>
                                    <td>{new Date(genre.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => { handleEdit(genre._id, genre.name); ScrollRef.current.focus() }} className='text-green-400'>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(genre._id, genre.name)} className='text-red-600'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" align="center">No genres created yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    
            {/* Pagination Controls */}
            <div className='flex justify-center gap-5 items-center mt-4'>
                <button 
                    onClick={() => fetchGenres(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'
                > 
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => fetchGenres(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className='px-4 py-2 bg-yellow-300 text-black rounded-lg'
                >
                    Next
                </button>
            </div>
        </div>
    
  )
}
