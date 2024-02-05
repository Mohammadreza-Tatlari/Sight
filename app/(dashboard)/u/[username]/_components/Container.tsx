'use client';

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface DashboardContainerProps{
    children: React.ReactNode;
}

export function DashboardContainer({children}: DashboardContainerProps){
    const { collapsed, onCollapse , onExpand } = useCreatorSidebar((state) => state);

    const matches = useMediaQuery(`(max-width: 1024px)`);

    useEffect(() => {
        if(matches){
            onCollapse();
        }
        else{
            onExpand()
        }
    },[onExpand , onCollapse , matches])
    return(
        <>
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>
        </>
    )
}