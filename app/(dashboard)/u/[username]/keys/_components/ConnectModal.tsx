"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { createIngress } from "@/actions/ingress";
import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export default function ConnectModal() {
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  async function onSubmit() {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress Created");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("something went wrong"));
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="primay">Generate Connection</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Connection</DialogTitle>
          </DialogHeader>
          <Select
            value={ingressType}
            onValueChange={(value) => setIngressType(value)}
            disabled={isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ingress Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
          </Select>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This action will reset all active stream using the current
              connection
            </AlertDescription>
          </Alert>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button variant="primay" onClick={onSubmit} disabled={isPending}>
              Generate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
