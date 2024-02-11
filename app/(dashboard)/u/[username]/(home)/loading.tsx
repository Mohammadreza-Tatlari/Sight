import { StreamPlayerSkeleton } from '@/components/Streaming/StreamPlayer'
import React from 'react'

export default function CreatorLoading() {
  return (
    <div className='h-full'>
        <StreamPlayerSkeleton />
    </div>
  )
}
