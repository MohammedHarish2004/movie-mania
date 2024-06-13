import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Drawer, Label, Spinner } from 'flowbite-react'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Movie() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        genre: '',
        searchTerm: ''
    });
    const[totalPages,setTotalPages] = useState(1)
    const[currentPage,setCurrentPage] = useState(1)
    const[totalMovies,setTotalMovies] = useState()

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const fetchMovies = async (searchTerm = '', genre = '',page=1) => {
        setLoading(true);
        const res = await fetch(`/api/movie/getMovie?theme=anime&page=${page}&limit=8&searchTerm=${searchTerm}&genre=${genre}`);
        const data = await res.json();
        setMovies(data.movies,);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalMovies(data.totalMovies);
        setLoading(false);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch('/api/genre/getGenre');
            const data = await res.json();
            if (res.ok) {
                setGenres(data.genres);
            }
        };
        fetchGenres();

        fetchMovies();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const genreFromUrl = urlParams.get('genre');

        if (searchTermFromUrl || genreFromUrl) {
            setFormData({
                searchTerm: searchTermFromUrl || '',
                genre: genreFromUrl || ''
            });
            fetchMovies(searchTermFromUrl, genreFromUrl, 1);
        } else {
            fetchMovies();
        }
    }, []);

  

    const applyFilter = (genre) => {
        setFormData({
            ...formData,
            genre: genre
        });
        setIsOpen(false);
        const urlParams = new URLSearchParams();
        urlParams.set('genre', genre);
        if (formData.searchTerm) {
            urlParams.set('searchTerm', formData.searchTerm);
        }
        const searchQuery = urlParams.toString();
        navigate(`/movies?theme=anime&${searchQuery}`);
        fetchMovies(formData.searchTerm,genre,1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', formData.searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/movies?theme=anime&${searchQuery}`)
        fetchMovies(formData.searchTerm,1);
        setFormData({
            searchTerm:''
        })
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' />
        </div>
    );

    return (
        <div className='max-w-full flex flex-wrap justify-center items-center mx-auto sm:justify-start gap-4 p-7'>
            <div className='container '>
                <h1 className='text-3xl sm:text-4xl w-full'>Animes</h1>
                <div className='flex justify-between gap-1 mt-6'>
                    <button className='bg-yellow-300 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 uppercase flex items-center gap-1' onClick={() => setIsOpen(true)}><FaFilter />Filter</button>
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-2'>
                            <input onChange={(e)=>setFormData({searchTerm:e.target.value})} placeholder='Search...' id='search' value={formData.searchTerm} className='bg-transparent block p-2 rounded-lg w-[150px] sm:w-full outline-none border border-yellow-300' />
                            <button className='bg-yellow-300 hover:bg-yellow-300 text-black p-2 px-2 rounded-lg font-bold transition delay-50 hover:opacity-85  disabled:opacity-80 uppercase flex items-center gap-1'><FaSearch /></button>
                        </div>
                    </form>
                    <Drawer open={isOpen} onClose={handleClose} className='bg-black text-white'>
                        <Drawer.Header title="Filter" />
                        <Drawer.Items>
                            <button onClick={() => applyFilter('')} className='text-2xl border-b py-3'>All Movies</button>
                            {genres && genres.map((genre) => (
                                <div key={genre._id}>
                                    <button onClick={() => applyFilter(genre.name.toLowerCase())} className='text-2xl border-b py-3'>{genre.name}</button>
                                </div>
                            ))}
                        </Drawer.Items>
                    </Drawer>
                </div>
            </div>
                {movies && movies.length > 0 ? movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))
                    :
                    <div className='mx-auto flex flex-col items-center justify-center p-3'>
                        <p className='text-4xl mt-4 text-center font-semibold'>Results <span className='text-yellow-300'>not found</span></p>
                    </div>
                }

        {/* Pagination controls */}
            <div className='flex w-full justify-center items-center mt-4 gap-5'>
                <button 
                className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'
                onClick={()=>fetchMovies(formData.searchTerm, formData.genre, currentPage - 1)}
                disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    {currentPage} of {totalPages}
                </span>
                <button 
                className='px-4 py-2 bg-yellow-300 text-black rounded-lg cursor-pointer disabled:cursor-not-allowed'
                onClick={()=>fetchMovies(formData.searchTerm, formData.genre, currentPage + 1)}
                disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
