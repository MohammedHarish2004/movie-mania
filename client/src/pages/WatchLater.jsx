import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeWatchlist, setWatchlist } from '../redux/Watchlist/watchlistSlice';
import { MdMovie } from 'react-icons/md';

export default function WatchLater() {
    const [loading, setLoading] = useState(false);
    const watchlist = useSelector((state) => state.watchlist.items) || [];
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.user)

    const fetchWatchlistMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/movie/getWatchlist', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            dispatch(setWatchlist(data.movies));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching watchlist movies:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlistMovies();
    }, [currentUser]);

    const deleteFromWatchlist = async (movieId) => {
        try {
            const res = await fetch('/api/movie/deleteFromWatchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId }),
            });
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message, { autoClose: 1000 });
            }
            if (res.ok) {
                dispatch(removeWatchlist(movieId));
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' color='warning' />
        </div>
    );

    return (
        <div className="max-w-full mx-auto p-7 md:py-10 min-h-screen">
            <h1 className="text-3xl md:text-4xl mb-5 mx-3">Watchlist</h1>
            <div className="flex justify-center items-center flex-wrap lg:justify-start sm:flex-row gap-6">
                {watchlist.length > 0 ? watchlist.map(movie => (
                    <div key={movie._id} className="shadow-md rounded-lg overflow-hidden relative group">
                        <button
                            onClick={() => deleteFromWatchlist(movie._id)}
                            className='bg-slate-300 z-10 text-black cursor-pointer hover:opacity-80 rounded-full p-2 absolute top-3 right-3 sm:top-2 sm:right-2'
                           
                        >
                            <FaTimes />
                        </button>
                        <Link to={`/details/${movie._id}`} className="block relative">
                            <img
                                src={movie.image}
                                alt="movie poster"
                                className=" h-[400px] object-cover sm:w-[300px] sm:object-nonetransition-transform duration-500 ease-in-out transform group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-100 p-3 transition-opacity duration-500 ease-in-out opacity-70 group-hover:opacity-100">
                                <h1 className="font-semibold text-sm truncate md:text-base capitalize">{movie.name} | {movie.theme}</h1>
                                <h1 className="flex gap-1 items-center capitalize font-semibold text-sm truncate md:text-base">
                                    <MdMovie /><span>{movie.genre}</span>
                                </h1>
                            </div>
                        </Link>
                    </div>
                )) : <span className='text-center mx-auto text-3xl'>No movies in your watchlist</span>}
            </div>
        </div>
    );
}
