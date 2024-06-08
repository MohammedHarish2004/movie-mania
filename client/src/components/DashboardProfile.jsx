import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.jpg'
import { Label, Spinner } from 'flowbite-react'

export default function DashboardProfile() {
    const {currentUser} = useSelector(state=>state.user)
    const[changeInfo,setChangeInfo] = useState(false)
    const ScrollRef = useRef(null)

    useEffect(() => {
        if(ScrollRef.current){
            ScrollRef.current.scrollIntoView({behavior: 'smooth'})
        }
      }, [changeInfo])

  return (
    <div className='max-w-xl w-full p-7 my-4'>
        <h1 className='text-4xl my-7'>Account Info</h1>
        <div className='flex flex-col gap-3'>
            <img src={avatar} alt="avatar" className='w-20 h-20 rounded-md '/>

            <span className='text-xl font-medium'>Username : {currentUser.username}</span>

            <span className='text-base text-gray-300 font-medium'>
               Dive into a world of endless entertainment with the latest trailers, exclusive movie details, and personalized recommendations just for you.
            <br/><br/>
               Happy Watching! 🍿🎬
            </span>
            <span onClick={()=>{setChangeInfo(!changeInfo);}} className='text-yellow-300 cursor-pointer font-medium mt-2'>
                {changeInfo ? 'Close Account Info' : 'Change Account Info'}
            </span>

            {
                changeInfo &&
               <>
                <form className='flex flex-col gap-3' ref={ScrollRef}>
                    <div>
                        <Label className='text-white text-base'>Username</Label>
                        <input placeholder='username' id='username' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
                    </div>
                    <div>
                        <Label className='text-white text-base'>Password</Label>
                        <input placeholder='password' id='password' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
                    </div>
                    <button className=' bg-yellow-300 w-full hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 mt-3 disabled:opacity-80 uppercase flex justify-center gap-2 items-center' >
                    <Spinner size='sm' color='gray'/>
                    <span>Update</span>
                    </button>
                </form>

               </>
            }
        </div> 
    </div>
  )
}
