import { Label, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { PiFilmReelFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../assets/stream.jpg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/User/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {

  const [loading,setLoading] = useState(false)
  const[formData,setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleChange = (e)=>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value
        })
    }  

    const handleSubmit = async (e)=>{
      e.preventDefault()

      if(!formData.username?.trim() || !formData.password?.trim()) return toast.warning('All the fields are required',{ autoClose: 1500 });

      try {
        setLoading(true)

        dispatch(signInStart())

        const res = await fetch('/api/auth/login',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
        
        const data = await res.json()
        if(data.success === false){
          toast.warning(data.message,{ autoClose: 1500 });
          dispatch(signInFailure(data.message))
          setLoading(false)
          return
        }
        dispatch(signInSuccess(data))
        toast.success('Logged In successfully',{
          theme: "dark",
          autoClose:1000,
        });
        navigate('/');

      } 
      catch (error) {
        toast.warning(error.message,{ autoClose: 1500 });
        dispatch(signInFailure(data.message))
        setLoading(false)
      }
    }  
  return (

    <div className="max-w-lg lg:max-w-6xl mx-auto p-3 mt-8 lg:mt-16 xl:mt-10 lg:flex items-center justify-center lg:gap-16">
    
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
          <div className='text-xl font-medium text-yellow-300 mb-6'>You can <span className='text-white'>Login</span> if you already have an account</div>
        </div>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
         <div>
            <Label className='text-white text-base'>Username</Label>
            <input placeholder='username' id='username' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300' onChange={handleChange} autoComplete='off'/>
         </div>
         <div>
            <Label className='text-white text-base'>Password</Label>
            <input type='password'  placeholder='password' id='password' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300' onChange={handleChange} autoComplete='off'/>
         </div>
         <button disabled={loading} className=' bg-yellow-300 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 mt-3 disabled:opacity-80 uppercase' >{
          loading ? <span><Spinner size='sm' color='gray'/> Loading</span> : 'Login'
         }</button>
         <OAuth />
        </form>
        <div className='flex gap-3 mt-7'>
          <span className='font-medium'>Don't have an account ?</span>
          <Link to='/sign-up' className='text-yellow-300 font-medium hover:underline'>
            Register
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
