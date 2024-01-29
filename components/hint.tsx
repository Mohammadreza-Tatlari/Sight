import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean; //for wrapping component and hydration handling
  side?: "top" | "bottom" | "left" | "right" | undefined;
  align?: "start" | "center" | "end";
}

export function Hint({ label, children, asChild, side, align }: HintProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black"
          side={side}
          align={align}
          >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
