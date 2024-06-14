import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import Movie from '../components/Movie'


export default function Movies() {
  const location = useLocation()
  const[theme,setTheme] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const themeFromUrl = urlParams.get('theme')
    setTheme(themeFromUrl)
  },[location.search])
  
  return (
    <div>
      {theme === 'movie' && <Movie />}
    </div>
  )
}
