import React from 'react'
import missing from '../assets/missing.png'

export default function Missing() {
  return (
    <div className='flex flex-col items-center justify-center p-3 mt-10'>
        <img src={missing} className='' alt="Not Found" />
        <p className='text-4xl mt-4 text-center font-semibold'>Page  <span className='text-yellow-300'>not found</span></p>
    </div>
  )
}
