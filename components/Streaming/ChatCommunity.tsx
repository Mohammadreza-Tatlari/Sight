"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import CommunityItem from "./CommunityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export default function ChatCommunity({
  isHidden,
  hostName,
  viewerName,
}: ChatCommunityProps) {
  const [value, setValue] = useState("");

  //slow down the query
  const debounceValue = useDebounce<String>(value, 500);
  const participants = useParticipants();

  function onChange(newValue: string) {
    setValue(newValue);
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debounceValue.toLowerCase());
    });
  }, [participants, debounceValue]);

  // if(isHidden) {
  //     return(
  //         <div className="flex flex-1 items-center justify-center">
  //             <p className="text-sm text-muted-foreground">
  //                 Community is disabled
  //             </p>
  //         </div>
  //     )
  // }
  return (
    <>
      <div className="p-4">
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Community"
          className="border-white/10"
        />
        <ScrollArea className="">
          <p className="text-center text-sm text-muted-foreground hidden last:block p-4">
            No result
          </p>
          {filteredParticipants.map((participant) => (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
