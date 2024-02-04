import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { isBlockedByUser } from "@/lib/block-service";

import { notFound } from "next/navigation";
import Actions from "./_components/actions";
interface UserPageProps{
  params: {
    username: string
  }
}

export default async function UserPage({params}: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if(!user){
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id)

  // if(isBlocked){
  //   return notFound();
  // }

  return (
    <>
    <div className="flex flex-col gap-y-4">
    <p>page of  {user.username}</p>
    <p>user Id {user.id}</p>
    <p>Is Following: {`${isFollowing}`}</p>
    <p>is Blocked: {`${isBlocked}`}</p>
    <Actions isFollowing={isFollowing} userId={user.id} isblocked={isBlocked} />
    </div>
    </>
  )
}
