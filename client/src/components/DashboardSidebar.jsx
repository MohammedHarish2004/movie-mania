import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaSignOutAlt, FaTrashAlt, FaUser } from "react-icons/fa";
import { BiMovie, BiSolidCategory } from "react-icons/bi";
import Swal from 'sweetalert2';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess } from '../redux/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardSidebar() {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const [tab,setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[location.search])

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

  const handleUserDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to logout!",
      icon: 'error',
      color: '#fff',
      background: "rgb(58, 58, 58)",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete !',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputPlaceholder: 'Type "Yes" to confirm', // Placeholder text for the input field
      customClass: {
        input: 'bg-transparent block p-2 rounded-lg  outline-none ' // Add a custom class to the input field
      },
      preConfirm: (value) => {
        if (value.toLowerCase() === 'yes') { // Check if the input value is 'yes'
          return true;
        } else {
          Swal.showValidationMessage('Please type "Yes" to confirm'); // Show validation message
          return false;
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(deleteUserStart())
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          })
          const data = await res.json()
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message))
            toast.error(`${data.message}`, {
              theme: "dark",
              autoClose: 1000,
            });
            return
          }
          dispatch(deleteUserSuccess(data))
          toast.success('Account Deleted Successfully', {
            theme: "dark",
            autoClose: 1500,
          });
          navigate('/sign-in')
        } catch (error) {
          dispatch(deleteUserFailure(error.message))
          toast.error(`${error.message}`, {
            theme: "dark",
            autoClose: 2000,
          });
        }
      }
    })
  }
  
  return (
    <Sidebar color='light' className='w-full md:w-56 text-white hover:text-black ' >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item className='font-medium cursor-pointer' as={Link} to={'/dashboard?tab=profile'} active={tab === 'profile'} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor="light" icon={FaUser}>
            <span className='font-medium cursor-pointer'>Account Info</span>
          </Sidebar.Item>
          {
            currentUser.isAdmin && 
            <Sidebar.Item className='font-medium cursor-pointer' as={Link} to={'/dashboard?tab=genre'} active={tab === 'genre'}  labelColor="light" icon={BiSolidCategory}>
              <span className='font-medium cursor-pointer'>Manage Genre</span>
            </Sidebar.Item>
          }
          {
            currentUser.isAdmin && 
            <Sidebar.Item className='font-medium cursor-pointer' as={Link} to={'/dashboard?tab=create-movie'} active={tab === 'create-movie'}  labelColor="light" icon={BiMovie}>
              <span className='font-medium cursor-pointer'>Create Movie</span>
            </Sidebar.Item>
          }
          <Sidebar.Item className='font-medium cursor-pointer' icon={FaTrashAlt} onClick={handleUserDelete}>
            <button  className='font-medium'>Delete Account</button>
          </Sidebar.Item>
          <Sidebar.Item className='font-medium cursor-pointer' icon={FaSignOutAlt} onClick={handleLogout}>
            <button  className='font-medium'>Logout</button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
