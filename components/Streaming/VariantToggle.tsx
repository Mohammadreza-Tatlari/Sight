'use client';

import { Users , MessageSquare } from "lucide-react";
import { Hint } from "../hint";
import { chatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { Button } from "../ui/button";

export default function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);
  const isChat = variant === chatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? chatVariant.COMMUNITY : chatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "chat";

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
