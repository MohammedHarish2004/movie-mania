import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  PiClockClockwiseBold, PiFilmReelFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import avatar from '../assets/avatar.jpg'
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOutSuccess } from "../redux/User/userSlice";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

export default function Header() {
    const location = useLocation()
    const path = location.pathname + location.search
    const {currentUser} = useSelector(state=>state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleLogout = ()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to logout!",
        icon: 'error',
        color:'#fff',
        background:"rgb(58, 58, 58)",
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout !',
      }).then(async(result)=>{
  
        if(result.isConfirmed){
          const res = await fetch('/api/auth/logout')
          const data = await res.json()
  
          if(data.success == false){
            return
          }
          dispatch(signOutSuccess(data))
          toast.success('Logged out successfully',{
            theme: "dark",
            autoClose:1500,
          });
          navigate('/sign-in')
        }
      })
    }
  return (
    <Navbar  className="bg-black p-3 border-b border-slate-700 ">
      <Navbar.Brand>
        <h1 className="flex gap-1 ms-5">
            <span className="flex  items-center gap-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl p-1 px-2 rounded-lg text-xl font-bold text-black"><PiFilmReelFill />Movie</span>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Mania</span>
        </h1>
      </Navbar.Brand>
      
      <div className="flex items-center gap-4 md:order-2 me-5">
        <Link  to='/watch-later' className="list-none hidden md:flex font-semibold">
            <Navbar.Link  active={path === '/watch-later'} as={'div'} className={path === '/watch-later' ? 'bg-transparent font-medium hover:text-white' : ''}>
                <span className={`text-lg ${path === '/watch-later' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white flex items-center gap-1 text-gray-400`}><PiClockClockwiseBold />Watch Later <span className="rounded-full bg-yellow-300 w-6 h-6 flex items-center justify-center text-sm text-black font-semibold">5</span></span>
            </Navbar.Link>
        </Link>
       {
        currentUser ?
        (
        <Dropdown inline arrowIcon={false} label={<Avatar img={avatar}/>} className="bg-gray-800 hover:text-black p-1 z-20 ">
          <Dropdown.Header className="text-white font-medium">
            User : {currentUser.username}
          </Dropdown.Header>
          <Dropdown.Item as={Link} to={'/dashboard?tab=profile'} className="text-white hover:text-black hover:bg-slate-600" icon={FaUserAlt}>
              Account Info
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={'div'} className="text-white hover:text-black" icon={FaSignOutAlt}  onClick={handleLogout}>
            <span >
              Logout
            </span>
          </Dropdown.Item>
        </Dropdown>
        )
        :
        (
        <Link to='/sign-in'>
            <button className="bg-transparent border-2 border-yellow-300 hover:bg-yellow-300 hover:text-black transition delay-50 p-1.5 px-3 rounded-lg  font-semibold">Sign In</button>
        </Link>
        )
       }
        <Navbar.Toggle className="bg-transparent border-none"/>
      </div>
      
      <Navbar.Collapse>
          <Link to='/' >
            <Navbar.Link  active={path === '/'} as={'div'} className={path === '/' ? 'bg-transparent font-medium hover:text-white' : ''}>
                <span className={`text-lg ${path === '/' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white text-gray-400`}>Home</span>
            </Navbar.Link>
          </Link>
          <Link to='/movies?theme=movie'>
            <Navbar.Link  active={path === '/movies?theme=movie'} as={'div'} className={path === '/movies?theme=movie' ? 'bg-transparent font-medium hover:text-white' : ''} >
                <span className={`text-lg ${path === '/movies?theme=movie' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white text-gray-400`}>Entertainment</span>
            </Navbar.Link>
          </Link>
          <Link to='/about'>
            <Navbar.Link  active={path === '/about'} as={'div'} className={path === '/about' ? 'bg-transparent font-medium hover:text-white' : ''} >
                <span className={`text-lg ${path === '/about' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white text-gray-400`}>Overview</span>
            </Navbar.Link>
          </Link>
        
          <Link to='/watch-later' className="md:hidden">
            <Navbar.Link  active={path === '/watch-later'} as={'div'} className={path === '/watch-later' ? 'bg-transparent font-medium hover:text-white' : ''}>
                <span className={`text-lg ${path === '/watch-later' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white flex items-center gap-1 text-gray-400`}><PiClockClockwiseBold />Watch Later <span className="rounded-full bg-yellow-300 w-6 h-6 flex items-center justify-center text-sm text-black font-semibold">5</span></span>
            </Navbar.Link>
          </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
