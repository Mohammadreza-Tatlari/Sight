"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}
export default function Actions({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) {

    const [isPending , startTransition] = useTransition()
    const {userId}= useAuth();
    const router = useRouter();

    function handleFollow() {
        startTransition(() => {
            onFollow(hostIdentity)
            .then((data) => toast.success(`You are now Following ${data.following.username}`))
            .catch(() => {toast.error("Something Went Wrong")})
        })
    }

    function handleUnfollow() {
        startTransition(() => {
            onUnfollow(hostIdentity)
            .then((data) => toast.success(`You Unfollowed ${data.following.username}`))
            .catch(() => {toast.error("Something Went Wrong")})
        })
    }

    function ToggleFollow() {
        if(!userId){
            return router.push('/sign-up');
        }

        if(!isHost) return;

        if(isFollowing) {
            handleUnfollow();
        } else{
            handleFollow();
        }
    }
  return (
    <Button
      disabled={isPending || isHost}
      onClick={ToggleFollow}
      variant="primay"
      size="sm"
      className="w-1/5 lg:w-auto"
    >
      <Heart className={cn('h-4 w-4 mr-2', isFollowing ? "fill-white" : "fill-none")}/>
      {
        isFollowing ? "Unfollow" : "Follow"
      }
    </Button>
  );
}

export function ActionSkeleton(){
    return(
        <Skeleton className="h-10 w-1/5 lg:w-24" />
    )
}