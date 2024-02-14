import { Check } from "lucide-react"


export default function VerifiedMark() {
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
        <Check className="ml-0.5 h-[10px] w-[10px] text-primary stroke-[4px]" />
    </div>
  )
}
