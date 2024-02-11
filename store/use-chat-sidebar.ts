import { create } from "zustand";

export enum chatVariant{
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY"
}
interface ChatSidebarStore{
    collapsed: boolean;
    variant: chatVariant
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: chatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: chatVariant.CHAT,
    onExpand: () => set(() => ({ collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
    onChangeVariant: (variant: chatVariant) => set(() => ({variant}))
}))