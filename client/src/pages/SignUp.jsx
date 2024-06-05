import { Label } from 'flowbite-react'
import React from 'react'
import { PiFilmReelFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import bg from '../assets/stream.jpg'
export default function SignIn() {
  return (

    <div className="max-w-lg lg:max-w-6xl mx-auto p-3 mt-8 lg:mt-16 xl:mt-20 lg:flex items-center justify-center lg:gap-16">
    
    {/* Left */}
      <div className='flex-none  p-3'>
        <div className='flex flex-col flex-wrap gap-5'>
          <div className='flex flex-wrap gap-2'>
            <h1 className='text-4xl font-semibold '>Welcome to </h1>
            <div className="flex gap-1">
              <span className="flex  items-center gap-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl p-1 px-4 rounded-lg text-3xl font-bold text-black"><PiFilmReelFill />Movie</span>
              <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">Mania</span>
            </div>
          </div>
          <div className='text-xl font-medium text-yellow-300 mb-6'>You can <span className='text-white'>Register</span> if your don't have an account</div>
        </div>
        <form className='flex flex-col gap-3'>
         <div>
            <Label className='text-white text-base'>Username</Label>
            <input color='' placeholder='username' id='username' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
         </div>
         <div>
            <Label className='text-white text-base'>Password</Label>
            <input  placeholder='password' id='password' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
         </div>
         <button className=' bg-yellow-300 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 mt-3' >Register</button>
        </form>
        <div className='flex justify-between mt-7'>
          <span className='font-medium'>Already have an account ?</span>
          <Link to='/sign-in' className='text-yellow-300 font-medium hover:underline'>
            Login
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className='hidden lg:flex lg:flex-1'>
        <img src={bg} alt="background" className='rounded-3xl '/>
      </div>

    </div>
    

  )
}
