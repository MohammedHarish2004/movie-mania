import React from 'react'
import portfolio from '../assets/portfolio.png'
export default function CallToAction() {
  return (
    <div className='flex flex-col md:flex-row p-3 m-5 border border-yellow-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex flex-1  flex-col justify-center p-3'>
           <h2 className='text-2xl'>
            Visit my portfolio for more projects  
           </h2>
           <p className='text-gray-500 my-2'>
            Checkout this website to watch freely
           </p>
           <a href='https://harrisportfolio.netlify.app' target='_blank' className='p-3 rounded-tl-xl rounded-bl-none w-full bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-bl text-black font-bold'>
            Visit Now
           </a>
        </div>
        <div className='flex-1 p-7'>
            <img src={portfolio} alt="" className='rounded-2xl'/>
        </div>
    </div>
  )
}
