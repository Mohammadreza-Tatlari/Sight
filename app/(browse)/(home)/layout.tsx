import React from 'react'
import Navbar from '../_components/navbar'

export default function BrowseLayout({children}: {children:React.ReactNode}) {
  return (
    <>
    <div className='flex h-full pt-20'>
        <Navbar />
        {children}
    </div>
    </>
  )
}
