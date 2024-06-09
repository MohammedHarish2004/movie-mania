import { Label } from 'flowbite-react'
import React from 'react'

export default function DashboardGenre() {
  return (
    <div className='max-w-4xl w-full p-5 flex flex-col gap-10'>

        {/* Genre Creation */}
        <div>
            <h1 className='text-3xl my-7'>Create Genre</h1>
            <form className='flex flex-col lg:flex-row lg:gap-4 lg:justify-center lg:items-center '>
                <div className='flex-1 flex flex-col gap-1'>
                    <Label className='text-white text-base'>Genre Name</Label>
                    <input placeholder='genre name' id='genre' className='bg-transparent block p-2 rounded-lg w-full outline-none border border-yellow-300'/>
                </div>
                <div className='flex-1'>
                    <button className='bg-yellow-300 w-auto px-7 lg:w-72 hover:bg-yellow-300 text-black p-2 rounded-lg font-bold transition delay-50 hover:opacity-85 disabled:opacity-80 mt-6 uppercase flex justify-center gap-2 items-center' >
                    {/* {loading ? 
                    <> */}
                    {/* <Spinner size='sm' color='gray'/>
                    <span>Updating</span>
                    </>
                    : */}
                    <span>Create Genre</span>
                    {/* } */}
                    </button>
                </div>
            </form>
        </div>

        {/* Genre list */}

        <div className='overflow-auto '>
            <h1 className='text-3xl my-7'>Genre Lists</h1>
            <table className='w-full '>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Genres</th>
                        <th>Created At</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Action</td>
                        <td>1/11/1111</td>
                        <td><button className='text-green-400 '>Edit</button></td>
                        <td><button className='text-red-600 '>Delete</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Action</td>
                        <td>1/11/1111</td>
                        <td><button className='text-green-400 '>Edit</button></td>
                        <td><button className='text-red-600 '>Delete</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Action</td>
                        <td>1/11/1111</td>
                        <td><button className='text-green-400 '>Edit</button></td>
                        <td><button className='text-red-600 '>Delete</button></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
