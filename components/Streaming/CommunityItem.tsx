"use client";

import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { Button } from "../ui/button";
import { Hint } from "../hint";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export default function CommunityItem({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) {
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const [isPending, startTransition] = useTransition();

  function handleBlock() {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`${participantName} is Blocked`))
        .catch(() => toast.error("something went wrong"));
    });
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-45 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            onClick={handleBlock}
            disabled={isPending}
            className="h-auto w-auto opacity-0 group-hover:opacity-100 transition"
            variant="ghost"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}
