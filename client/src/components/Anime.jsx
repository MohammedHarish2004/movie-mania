import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Drawer, Label, Spinner } from 'flowbite-react'
import { FaFilter, FaSearch } from 'react-icons/fa'

export default function Movie() {

    const[movies,setMovies] = useState('')
    const[loading,setLoading] = useState(false)
    const [genres,setGenres] = useState()

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    useEffect(()=>{
       const fetchMovies = async()=>{
        setLoading(true)
        const res = await fetch(`/api/movie/getMovie?theme=anime`)
        const data = await res.json()
        setMovies(data)
        setLoading(false)
       }
       fetchMovies() 
    },[])

    useEffect(()=>{
        const fetchGenres = async()=>{
            const res = await fetch('/api/genre/getGenre')
            const data = await res.json()
            if(res.ok){
                setGenres(data)
            }
        }
        fetchGenres()
    },[])

    if(loading) return(
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' />
        </div>
    )

   

  return (
    
    <div className='max-w-full flex flex-wrap justify-center items-center mx-auto sm:justify-start gap-4 p-6 lg:p-7'>
        <div className='container '>
            <h1 className='text-3xl sm:text-4xl w-full '>Animes</h1>
            <div className='flex justify-between gap-1 mt-6'>
                <button className='bg-yellow-300 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 uppercase flex items-center gap-1' onClick={() => setIsOpen(true)}><FaFilter/>Filter</button>
                <form>
                    <div className='flex gap-2'>
                        <input placeholder='Search...' id='search' className='bg-transparent block p-2 rounded-lg w-[150px] sm:w-full outline-none border border-yellow-300' />
                        <button className='bg-yellow-300 hover:bg-yellow-300 text-black p-2 px-2 rounded-lg font-bold transition delay-50 hover:opacity-85  disabled:opacity-80 uppercase flex items-center gap-1'><FaSearch/></button>
                    </div>
                </form>
                <Drawer open={isOpen} onClose={handleClose}  className='bg-black text-white'>
                    <Drawer.Header  title="Filter"/>
                    <Drawer.Items>
                        <h1 className='text-2xl border-b py-3'>All Animes</h1>

                        {
                            genres && genres.map((genre)=>(
                               <div key={genre._id}>
                                 <h1 className='text-2xl border-b py-3'>{genre.name}</h1>
                               </div>
                            ))
                        }
                    </Drawer.Items>
                </Drawer>
            </div>
        </div>
        {movies && movies.length > 0 && movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
        ))}
    </div>


  )
}
