"use client";

import { useTransition } from "react";

import { onUnblock } from "@/actions/block";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UnblockProps {
  userId: string;
}

export default function UnblockButton({ userId }: UnblockProps) {
  const [isPending, startTranstion] = useTransition();

  function onClick() {
    startTranstion(() => {
      onUnblock(userId)
        .then((result) =>
          toast.success(`User ${result.blocked.username} unblocked`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return(
    <div>
        <Button disabled={isPending} onClick={onClick} variant='link' size='sm' className="text-sky-700 w-full">Unblock</Button>
    </div>
  );
}
