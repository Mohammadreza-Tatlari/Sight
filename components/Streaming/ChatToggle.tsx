'use client';

import { ArrowRightFromLine, ArrowLeftFromLine } from "lucide-react";
import { Hint } from "../hint";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Button } from "../ui/button";

export default function ChatToggle() {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if(collapsed) {
        onExpand();
    } else{
        onCollapse();
    }
  };

  const label = collapsed ? "Expand Chat" : "Collapse Chat";

  return (
    <>
    <Hint label={label}>
        <Button
        onClick={onToggle}
        variant="ghost" 
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent">
            <Icon className="h-4 w-4"/>
        </Button>
    </Hint>
    </>
  );
}
