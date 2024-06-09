import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { useLocation } from 'react-router-dom'
import DashboardProfile from '../components/DashboardProfile'
import DashboardGenre from '../components/DashboardGenre'
import { useSelector } from 'react-redux'

export default function Dashboard() {

  const location = useLocation()  
  const[tab,setTab] = useState('')
  const {currentUser} = useSelector(state=>state.user)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[location.search])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashboardSidebar />
      </div>

    {/* Profile */}
    { tab === 'profile' &&  <DashboardProfile />}

    {currentUser.isAdmin && tab === 'genre' && <DashboardGenre />}
    </div>
  )
}
