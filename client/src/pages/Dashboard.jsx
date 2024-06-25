import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import { useLocation } from 'react-router-dom'
import DashboardProfile from '../components/DashboardProfile'
import DashboardGenre from '../components/DashboardGenre'
import { useSelector } from 'react-redux'
import CreateMovie from './CreateMovie'
import DashboardMovieList from '../components/DashboardMovieList'
import CreateSlider from './CreateSlider'
import DashboardSliderList from '../components/DashboardSliderList'

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

    {/* Genre */}
    {currentUser.isAdmin && tab === 'genre' && <DashboardGenre />}

    {/* Movie */}
    {currentUser.isAdmin && tab === 'create-movie' && <CreateMovie />}
    
    {/* Movie list  */}
    {currentUser.isAdmin && tab === 'movie-list' && <DashboardMovieList />}
    
    {/* Slider */}
    {currentUser.isAdmin && tab === 'create-slider' && <CreateSlider />}
    
    {/* Slider list  */}
    {currentUser.isAdmin && tab === 'slider-list' && <DashboardSliderList />}
    </div>
  )
}
