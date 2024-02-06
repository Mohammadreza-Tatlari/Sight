import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'
import ToggleCard from './_components/ToggleCard'

export default async function ChatPage() {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if(!stream) {
        throw new Error("stream not found")
    }
  return (
    <>
    <div className='p-6'>
        <div className='mb-4'>
            <h1 className='text-2xl font-bold'>
                Chat Setting
            </h1>
        </div>
        <div className='space-y-4'>
            <ToggleCard 
            field="isChatEnabled"
            label="Enable chat"
            value={stream.isChatEnabled}/>

            <ToggleCard 
            field="isChatFollowersOnly"
            label="only Followers can chat"
            value={stream.isChatFollowersOnly}/>

            <ToggleCard 
            field="isChatDelayed"
            label="Make a Delay in chat"
            value={stream.isChatDelayed}/>
        </div>
    </div>
    </>
  )
}
