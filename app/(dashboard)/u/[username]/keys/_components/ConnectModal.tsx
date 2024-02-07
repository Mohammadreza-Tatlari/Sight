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
    Select ,
    SelectTrigger,
    SelectValue,
    SelectContent ,
    SelectItem
} from "@/components/ui/select"

import {AlertDescription , AlertTitle , Alert} from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react";

export default function ConnectModal() {
  return(
    <>
    <Dialog>
        <DialogTrigger>
            <Button variant="primay">
                Generate Connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate Connection</DialogTitle>
            </DialogHeader>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ingress Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="RTMP">RTMP</SelectItem>
                    <SelectItem value="WHIP">WHIP</SelectItem>

                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle  className="h-4 w-4"/>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                    This action will reset all active stream using the current connection
                </AlertDescription>
            </Alert>
            <div className="flex justify-between">
                <DialogClose>
                    <Button variant="ghost">
                        Cancel
                    </Button>
                </DialogClose>
                <Button variant="primay" onClick={() => {}}>
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
