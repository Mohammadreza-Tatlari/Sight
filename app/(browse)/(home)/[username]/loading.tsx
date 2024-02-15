import { StreamPlayerSkeleton } from '@/components/Streaming/StreamPlayer'
import React from 'react'

export default function UserLoading() {
  return (
    <>
    <div className='h-full'>
        <StreamPlayerSkeleton />
    </div>
    </>
  )
}
