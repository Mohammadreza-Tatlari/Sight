"use client";

import { useViewToken } from "@/hooks/use-view-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}
export default function StreamPlayer({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) {
  const { token, name, identity } = useViewToken(user.id);

  if (!token || !name || !identity) {
    <div>Cannot watch the stream</div>;
  }
  return (
    <>
      <div>Allowed to Watch the stream</div>
    </>
  );
}
