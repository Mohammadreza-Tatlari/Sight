import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export default function ChatInfo({
  isDelayed,
  isFollowersOnly,
}: ChatInfoProps) {

  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only Followers can chat";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isFollowersOnly) {
      return "Only Followrs can chat. messages are delayed for 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only";
    }
    if (isDelayed && !isFollowersOnly) {
      return "delay";
    }
    if (isDelayed && isFollowersOnly) {
      return "delay and Followers only";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  if(!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <>
      <div 
      className="flex p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md items-center gap-x-2">
        <Hint label={hint}>
            <Info className="h-4 w-4"/>
        </Hint>
        <p className="text-xs font-semibold">
            {label}
        </p>
      </div>
    </>
  );
}
