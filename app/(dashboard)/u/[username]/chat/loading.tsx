import React from 'react'
import { ToggleCardSkeleton } from './_components/ToggleCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChatLoading() {
  return (
    <>
    <div className='p-6 space-y-4'>
        <Skeleton className='h-10 w-[200px] px-14'/>
    </div>
    <div className='space-y-4 px-14'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
    </div>
    </>
  )
}
