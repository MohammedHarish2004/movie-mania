import { Sidebar } from 'flowbite-react'
import React from 'react'
import { FaSignOutAlt, FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
import { signOutSuccess } from '../redux/User/userSlice';
import { useDispatch } from 'react-redux';
export default function DashboardSidebar() {

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
        navigate('/sign-in')
      }
    })
  }

  return (
    <Sidebar color='light' className='w-full md:w-56 text-white hover:text-black ' >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item active label='User' labelColor="light" icon={FaUser}>
            <span className='font-medium'>Account Info</span>
          </Sidebar.Item>
          <Sidebar.Item icon={FaTrashAlt} >
            <button className='font-medium'>Delete Account</button>
          </Sidebar.Item>
          <Sidebar.Item icon={FaSignOutAlt} >
            <button onClick={handleLogout} className='font-medium'>Logout</button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
