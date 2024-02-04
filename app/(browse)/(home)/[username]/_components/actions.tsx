"use client";
import { onBlock, onUnblock } from "@/actions/block";
//built in RPC allow us API less mutation
// it is a server action
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsPorps {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsPorps) {
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`you are now following ${data.following.username}`);
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    });
  }

  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You Unfollowed ${data.following.username}`);
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    });
  }

  function OnClick() {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  function handleBlock(){
    startTransition(() => {
      onUnblock(userId)
      .then((data) => toast.success(`unBlocked User ${data.blocked.username}`))
      .catch(() => toast.error('something went wrong'))
    })
  }

  return (
    <>
      <Button disabled={isPending} onClick={OnClick} variant="primay">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>unBlock</Button>
    </>
  );
}
