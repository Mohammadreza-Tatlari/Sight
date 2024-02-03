"use client";
//built in RPC allow us API less mutation
// it is a server action
import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsPorps {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsPorps) {
  const [isPending, startTransition] = useTransition();
  function onClick() {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`you are now following ${data.following.username}`);
        })
        .catch((data) => {
          toast.error("Something went wrong");
        });
        
  });
  }
  return (
    <Button
      disabled={isFollowing || isPending}
      onClick={onClick}
      variant="primay"
    >
      Follow
    </Button>
  );
}
