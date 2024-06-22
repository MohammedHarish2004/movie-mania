import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchlist } from '../redux/Watchlist/watchlistSlice';

export default function MoviePage() {
    const { movieId } = useParams();
    const [movie,setMovie] = useState('');
    const [relatedMovie, setRelatedMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)

    useEffect(() => {
        fetchMovies();
    }, [movieId]);

    useEffect(() => {
        const fetchRelatedMovies = async () => {
            if (movie.genre) {
                const res = await fetch(`/api/movie/getMovie?genre=${movie.genre}`);
                const data = await res.json();
                setRelatedMovie(data.movies.filter(mId => mId._id !== movieId));
            }
        };

        fetchRelatedMovies();
    }, [movie, movieId]);

    useEffect(() => {
        if (relatedMovie.length > 0) {
            const owl = $('.owl-carousel').owlCarousel({
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                margin: 10,
                nav: false,
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 4
                    },
                    1000: {
                        items: 5
                    }
                }
            });

            return () => {
                owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                owl.find('.owl-stage-outer').children().unwrap();
            };
        }
    }, [relatedMovie]);

    const fetchMovies = async () => {
        setLoading(true);
        const res = await fetch(`/api/movie/getMovie?movieId=${movieId}`);
        const data = await res.json();
        setMovie(data.movies[0]);
        setLoading(false);
    };

    const addToWatchlist = async () => {
        try {
            const res = await fetch('/api/movie/addToWatchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId })
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Movie added to watchlist!', { autoClose: 500 })
                const watchlistRes = await fetch('/api/movie/getWatchlist', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const watchlistData = await watchlistRes.json();
                dispatch(setWatchlist(watchlistData.movies));
            } else {
                toast.error(data.message, { autoClose: 1000 })
            }
        } catch (error) {
            toast.error('Failed to add movie to watchlist', { autoClose: 1000 });
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' color='warning'/>
        </div>
    );

    return (
        <div className='max-w-3xl mx-auto p-7 md:max-w-6xl md:mx-14 md:py-10 '>
            {
                movie && 
                <div className='flex md:gap-2 flex-col-reverse md:flex-row justify-between items-center md:items-start relative'>
                    <div className='bg-slate-300 text-black cursor-pointer hover:opacity-80 rounded-full p-2 absolute top-0 left-0 md:hidden'>
                       <Link to={`/movies?theme=movie`}>
                        <IoArrowBack/>
                       </Link>
                    </div>
                    <div className='flex flex-col md:flex-none items-center mt-6 md:mt-0 justify-center md:justify-start md:items-start '>
                        <h1 className='text-3xl text-center sm:text-start md:text-4xl lg:text-5xl sm:max-w-xs lg:max-w-xl p-1 capitalize'>{movie.name}</h1>
                        <div className='mt-4 md:mt-3 ms-1 flex gap-3'>
                            <span className='text-gray-400 text-xl '>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                            <span className='text-gray-400 text-xl capitalize '>{movie.genre} HD</span>
                        </div>
                        <div className='mt-3 ms-1 flex gap-3'>
                            <span className='text-gray-400 text-xl'>{movie.year}</span>
                            <span className='text-gray-400 text-xl'>{movie.theme === 'movie' ?  movie.duration + ' mins' :  movie.duration + '+'}</span>
                            <span className='text-gray-400 text-sm border border-gray-400 p-1'>{movie.age}+</span>
                        </div>
                        <div>
                            <p className='text-center text-base md:text-start md:text-lg md:px-0 sm:max-w-sm lg:max-w-xl lg:text-xl  mt-2'>{movie.description}</p>
                        </div>
                        <div className='flex gap-7 mt-4 md:mt-2'>
                            <div className='flex flex-col sm:flex-row gap-2'>
                            <Link 
                            to={`/view?movieUrl=${encodeURIComponent(movie.url)}`} 
                            className='border-2 border-black bg-yellow-300 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-80 mt-3 uppercase px-4 text-xs sm:text-base text-center'
                            >
                            Play trailer
                            </Link>
                            {currentUser ? 
                                (
                                <button onClick={addToWatchlist} className='w-full border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black font-bold text-white p-2 rounded-lg transition delay-50  mt-3 uppercase flex gap-2 items-center justify-center px-4 text-xs sm:text-base' >
                                    Watchlist <FaPlus />
                                </button>
                            )
                            :
                            (
                                <Link to='/sign-in' className=' border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black font-bold text-white p-2 rounded-lg transition delay-50  mt-3 uppercase flex gap-2 items-center justify-center px-4 text-xs sm:text-base' >
                                    Sign In to Add to watchlist<FaPlus />
                                </Link>
                            )
                            }
                            </div>
                        </div>
                    </div>
                    <div>
                        <img 
                        src={movie.image} 
                        alt="movie poster" 
                        className='object-contain w-[350px] h-[425px] sm:w-[300px] sm:h-[350px] lg:w-[400px] lg:h-[500px]'/>
                    </div>
                </div>
            }

           <div className='mt-2'>
            <h1 className='text-2xl md:text-3xl my-3'>Related Movies</h1>
                <div className='owl-carousel'>
                    {relatedMovie.length > 0 ?
                    relatedMovie.map((movie) => (
                        <div className='item' key={movie._id}>
                                <Link to={`/details/${movie._id}`} >
                                    <img src={movie.image} alt="movie poster" className='h-[225px] md:h-[220px] lg:h-[300px] '/>
                                    <div className='bg-black p-2'>
                                        <h1 className='font-medium truncate'>{movie.name} | {movie.theme}</h1>
                                        <div className='flex gap-2 text-gray-500 text-sm font-medium truncate'>
                                            <span>IMdb {movie.rating ? movie.rating : '7.5'}</span>
                                            <span>{movie.year}</span>
                                            <span>{movie.age}+</span>
                                        </div>
                                    </div>
                                </Link>
                        </div>
                    ))
                :
                <span>No movies available</span>
                }
                </div>
           </div>

        </div>
    );
}
 