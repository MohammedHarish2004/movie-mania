import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
    const path = useLocation().pathname

  return (
    <Navbar  className="bg-black p-3 border-b border-slate-700 ">
      <Navbar.Brand>
        <h1 className="flex gap-1">
            <span className="bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-bl p-1 px-4 rounded-lg text-xl font-semibold ">Movie</span>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Mania</span>
        </h1>
      </Navbar.Brand>
      
      <div className="flex items-center gap-2 md:order-2">
        <Link to='/sign-in'>
            <button className="bg-transparent border-2 border-red-600 hover:bg-red-600 transition delay-50 p-1.5 px-3 rounded-lg  font-semibold">Sign In</button>
        </Link>
        <Navbar.Toggle className="bg-transparent border-none"/>
      </div>
      
      <Navbar.Collapse className="text-white">
          <Link to='/'>
            <Navbar.Link  active={path === '/'} as={'div'} className={path === '/' ? 'bg-transparent font-medium text-red-600' : ''}>
                <span className={`text-lg ${path === '/' ? 'text-white' : ''}`}>Home</span>
            </Navbar.Link>
          </Link>
          <Link to='/movies'>
            <Navbar.Link  active={path === '/movies'} as={'div'} className={path === '/movies' ? 'bg-transparent text-red-600' : ''} >
                <span className={`text-lg ${path === '/movies' ? 'text-white' : ''}`}>Movies</span>
            </Navbar.Link>
          </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
