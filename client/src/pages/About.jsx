import React from 'react'
import { PiFilmReelFill } from 'react-icons/pi'

export default function About() {
  return (
    <div className='max-w-5xl min-h-screen mx-auto p-7 '>

    <div className='flex flex-wrap gap-2 justify-center mt-7'>
      <h1 className='text-4xl font-semibold '>Welcome to </h1>
      <div className="flex gap-1">
        <span className="flex  items-center gap-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl p-1 px-4 rounded-lg text-3xl font-bold text-black"><PiFilmReelFill />Movie</span>
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">Mania</span>
      </div>
    </div>
    <h1 className='text-2xl sm:text-3xl font-medium text-center my-3'>
      Your ultimate destination for all things movies, anime, and series!
    </h1>

    <div className='text-start my-2'>
      <h2 className='text-2xl sm:text-3xl font-medium py-2'>Key Features:</h2>
      <ul className='list-none my-3 font-medium'>
        <li className='text-xl py-3'><span className='text-2xl font-semibold text-yellow-300'>Diverse Themes: </span> Explore a wide range of themes, including movies, anime, and series, catering to different entertainment preferences.</li>
        <li className='text-xl py-3'><span className='text-2xl font-semibold text-yellow-300'>Advanced Search: </span>Discover your favorite content easily with our advanced search functionality, allowing you to find movies, anime, or series based on specific criteria.</li>
        <li className='text-xl py-3'><span className='text-2xl font-semibold text-yellow-300'>Filter Options: </span>Tailor your browsing experience with our filter options, helping you narrow down your search to find exactly what you're looking for.</li>
        <li className='text-xl py-3'><span className='text-2xl font-semibold text-yellow-300'>Secure Authentication: </span>Enjoy peace of mind with our OAuth authentication, ensuring your personal information is always protected.</li>
        <li className='text-xl py-3'>
        <span className='text-2xl font-semibold text-yellow-300'>Admin Dashboard: </span> Content creators and distributors can manage and showcase their movies, anime, and series through our dedicated admin dashboard.
        </li>
      </ul>
      <p className='font-semibold text-lg sm:text-xl text-center py-3'>Join us on Movie Mania and embark on a journey through the world of entertainment like never before. Let's make every viewing experience a memorable one!</p>
    </div>


    </div>
  )
}
