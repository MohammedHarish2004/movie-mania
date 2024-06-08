import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {  PiClockClockwiseBold, PiFilmReelFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import avatar from '../assets/avatar.jpg'

export default function Header() {
    const path = useLocation().pathname
    const {currentUser} = useSelector(state=>state.user)

  return (
    <Navbar  className="bg-black p-3 border-b border-slate-700 ">
      <Navbar.Brand>
        <h1 className="flex gap-1">
            <span className="flex  items-center gap-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl p-1 px-2 rounded-lg text-xl font-bold text-black"><PiFilmReelFill />Movie</span>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Mania</span>
        </h1>
      </Navbar.Brand>
      
      <div className="flex items-center gap-4 md:order-2">
      <Link className="list-none hidden md:flex font-semibold">
            <Navbar.Link  active={path === ''} as={'div'} className={path === '' ? 'bg-transparent font-medium hover:text-white' : ''}>
                <span className={`text-lg ${path === '' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white flex items-center gap-1 text-gray-500`}><PiClockClockwiseBold />Watch Later <span className="rounded-full bg-yellow-300 w-6 h-6 flex items-center justify-center text-sm text-black font-semibold">5</span></span>
            </Navbar.Link>
        </Link>
       {
        currentUser ?
        (
        <Dropdown inline arrowIcon={false} label={<Avatar img={avatar}/>} className="bg-gray-900 hover:text-black">
          <Dropdown.Header className="text-white ">
            Username: {currentUser.username}
          </Dropdown.Header>
          <Dropdown.Item as={Link} to={'/dashboard?tab=profile'} className="text-white hover:text-black hover:bg-slate-600">
              Account Info
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={'div'} className="text-white hover:text-black">
            Sign Out
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
                <span className={`text-lg ${path === '/' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white text-gray-500`}>Home</span>
            </Navbar.Link>
          </Link>
          <Link to='/movies'>
            <Navbar.Link  active={path === '/movies'} as={'div'} className={path === '/movies' ? 'bg-transparent font-medium hover:text-white' : ''} >
                <span className={`text-lg ${path === '/movies' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white text-gray-500`}>Movies</span>
            </Navbar.Link>
          </Link>
          <Link className="md:hidden">
            <Navbar.Link  active={path === ''} as={'div'} className={path === '' ? 'bg-transparent font-medium hover:text-white' : ''}>
                <span className={`text-lg ${path === '' ? 'text-yellow-300 hover:text-white' : ''}hover:text-white flex items-center gap-1 text-gray-500`}><PiClockClockwiseBold />Watch Later <span className="rounded-full bg-yellow-300 w-6 h-6 flex items-center justify-center text-sm text-black font-semibold">5</span></span>
            </Navbar.Link>
          </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
