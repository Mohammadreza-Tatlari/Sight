"use client";

import React, { ElementRef, useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Hint } from "../hint";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export default function InfoModal({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream Updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("something went wrong"));
    });
  }

  function onRemoveThumbnail() {
    startTransition(() => {
        updateStream({thumbnailUrl: null})
        .then(() => {
            toast.success("Thumbnail Removed");
            setThumbnailUrl('');
        })
        .catch(() => toast.error("something went wrong"))
    })
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="ml-auto">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Stream Info</DialogTitle>
          <DialogHeader>
            <form onSubmit={onSubmit} className="space-y-14">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Stream Name"
                  onChange={onChange}
                  value={name}
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                {thumbnailUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute top-2 right-2 z-10">
                        <Hint label="Remove Thumbnail" asChild side="left">
                            <Button type="button" disabled={isPending}
                            onClick={onRemoveThumbnail}
                            className="h-auto w-auto p-1.5 bg-slate-300">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </Hint>
                    </div>
                    <Image
                    src={thumbnailUrl}
                    alt="thumbnailUrl"
                    fill
                    className="object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <div className="rounded-xl border outline-dashed outline-muted">
                      <UploadDropzone
                        endpoint="thumbnailUploader"
                        appearance={{
                          label: {
                            color: "#FFFFFF",
                          },
                          allowedContent: {
                            color: "#FFFFFF",
                          },
                        }}
                        onClientUploadComplete={(res) => {
                          setThumbnailUrl(res?.[0]?.url);
                          router.refresh();
                          closeRef.current?.click();
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between">
                <DialogClose ref={closeRef} asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="primay" disabled={isPending} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
