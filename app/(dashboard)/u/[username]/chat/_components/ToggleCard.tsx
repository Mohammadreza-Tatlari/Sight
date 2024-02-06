'use client'

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { updateStream } from "@/actions/stream";

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps{
    field: FieldTypes;
    label: string;
    value: boolean;
}

export default function ToggleCard({field, label, value = false}:ToggleCardProps) {

    const [isPending , startTransition] = useTransition();
    function onChange(){
        startTransition(() => {
            updateStream({ [field]: !value })
            .then(() => toast.success("chat setting updated"))
            .catch(() => toast.error("something went wrong"))
        })
    }
  return (
    <>
    <div className="rounded-xl bg-muted p-6">
        <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <div className="space-y-2">
                <Switch onCheckedChange={onChange} 
                disabled={isPending}
                checked={value}>
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    </div>
    </>
  )
}

export function ToggleCardSkeleton() {
    return(
        <>
        <Skeleton className="rounded-xl p-10 w-full" />
        </>
    )
}