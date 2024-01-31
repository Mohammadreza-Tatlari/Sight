"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import UserAvatar from "@/components/user-avatar";
import LiveBadge from "@/components/live-badge";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export default function UserItem({
  username,
  imageUrl,
  isLive,
}: UserItemProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);
  const href = `/${username}`;

  //if it is being displayed on screen
  const isActive = pathname === href;

  return (
    <>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              "flex items-center w-full gap-x-4",
              collapsed && "justify-center"
            )}
          >
            <UserAvatar
              imageUrl={imageUrl}
              username={username}
              isLive={isLive}
              showBadge
            />
            {!collapsed && <p className="truncate">{username}</p>}
            {!collapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
        </Link>
      </Button>
    </>
  );
}

export function UserItemSkeleton() {
  return (
    <>
      <li className="flex items-center gap-x-4 px-3 py-2">
        <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6" />
        </div>
      </li>
    </>
  );
}

export function ToggleSkeleton() {
  return(
    <>
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]"/>
      <Skeleton className="h-6 w-6"/>
    </div>
    </>
  )
}

