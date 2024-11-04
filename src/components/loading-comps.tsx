import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
export default function LoadingComps() {
  return (
    <div className="flex flex-col mt-20 w-full gap-4">
      {/* <Skeleton className="h-[60vh] md:w-[60%] max-w-[1000px] w-[90%] mx-auto rounded-xl bg-gray-800" /> */}
      <Skeleton className="h-[90vw] w-[90%] mx-auto rounded-xl bg-gray-800" />
      {/* <div className="md:w-[60%] max-w-[1000px] w-[90%] mx-auto flex flex-col gap-3">
        <Skeleton className="h-10 md:w-[60%] max-w-[1000px] w-[90%] bg-gray-800" />
        <Skeleton className="h-20 md:w-[60%] max-w-[1000px] w-[90%] bg-gray-800" />
      </div> */}
    </div>
  )
}
