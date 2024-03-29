import { getRecommended } from '@/lib/recommended-service'

import Wrapper from './wrapper'
import Toggle from './Toggle'
import Following, { FollowingSkeleton } from './Following'
import Recommended, { RecommendedSkeleton } from './recommended'
import { ToggleSkeleton } from './user-item'
import { getFollowedUser } from '@/lib/follow-service'

export default async function Sidebar() {
  const recommended = await getRecommended()
  const following = await getFollowedUser();
  return (
    <Wrapper>
        <Toggle />
        <div className='space-y-4 pt-4 lg:pt-0'>
        <Following data={following} />
        <Recommended data={recommended} />
        </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return(
    <>
    {/* this skeleton will fix the first width initiate of sidebar */}
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
    <ToggleSkeleton />
    <FollowingSkeleton />
    <RecommendedSkeleton />
    </aside>
    </>
  )
}
