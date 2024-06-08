import { Sidebar } from 'flowbite-react'
import React from 'react'

export default function DashboardSidebar() {
  return (
    <Sidebar color='dark' className='w-full md:w-56 text-white hover:text-black ' >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" active label='User' labelColor="light">
            Account Info
          </Sidebar.Item>
          <Sidebar.Item href="#" >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
