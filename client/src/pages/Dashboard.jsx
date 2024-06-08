import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { useLocation } from 'react-router-dom'
import DashboardProfile from '../components/DashboardProfile'

export default function Dashboard() {

  const location = useLocation()  
  const[tab,setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashboardSidebar />
      </div>

    {/* Profile */}
    { tab === 'profile' &&  <DashboardProfile />}

    </div>
  )
}
