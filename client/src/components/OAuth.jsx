import { Spinner } from 'flowbite-react'
import { PiGoogleChromeLogo } from 'react-icons/pi'
import { app } from '../firebase'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/User/userSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OAuth() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.user)

    const handleGoogle = async ()=>{

       try {        
        
        dispatch(signInStart())

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})

        const auth = getAuth(app)
        const result = await signInWithPopup(auth,provider) 


        const res = await fetch('/api/auth/google',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:result.user.displayName,
                email:result.user.email,
            })
        })

        const data = await res.json()

        dispatch(signInSuccess(data))
        navigate('/')
        toast.success('Logged In successfully',{
            theme: "dark",
            autoClose:1000,
          });
       }
       
       catch (error) {
        console.log(error.message);
       }

    }
  return (
    <button disabled={loading} type='button' onClick={handleGoogle}  className='border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black text-white p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 mt-3 disabled:opacity-80 uppercase' >
    <span className='flex items-center gap-2 justify-center'>
        {loading ?
        <>
        <Spinner size='sm' color='gray'/> 
        Loading...
        </>
        :
        <>
            Continue with Google
            <span><PiGoogleChromeLogo className='w-6 h-6'/></span>
        </>
        }
        
    </span>
    </button>
  )
}
