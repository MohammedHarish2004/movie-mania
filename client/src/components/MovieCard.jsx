import { Spinner } from 'flowbite-react';
import React from 'react'
import { FaClock ,FaCalendar } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

export default function MovieCard({movie,loading}) {
 
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl' />
    </div>
);

  return (
    <div className='my-3'>
        <div className="relative overflow-hidden group transition-all">
            <img 
            src={loading ? <Spinner size='xl' /> : movie.image} 
            alt="movie poster"
             className="
              w-[140px] h-[230px]
              sm:w-[190px] sm:h-[280px] 
              lg:w-[300px] lg:h-[400px]" />

            <div className="flex flex-col gap-2 absolute bg-black p-3 opacity-95 left-0 w-full duration-300 
            -bottom-16 group-hover:-bottom-8
            sm:group-hover:bottom-0 sm:-bottom-8  
            md:group-hover:bottom-0 md:-bottom-8 ">
                <h1 className="font-semibold text-sm truncate md:text-base">{movie.name}</h1>
                <h1 className="flex gap-1 items-center capitalize font-semibold text-sm truncate md:text-base"><MdMovie /><span>{movie.genre}</span></h1>
                <div className="flex gap-3 font-serif">
                    <p className='flex items-center gap-1 text-sm truncate md:text-base'><span>{movie.age}+ </span></p>
                    <p className='flex items-center gap-1 text-sm truncate md:text-base'><FaCalendar /><span>{movie.year} </span></p>
                    <p className='flex items-center gap-1 text-sm truncate md:text-base'><FaClock /><span>{movie.duration} mins</span></p>
                </div>
            </div>
        </div>
    </div>

  )
}
