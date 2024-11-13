// "use client";
import { Icon } from "@iconify/react";
export default function FullPageLoading() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      {/* <Icon icon="svg-spinners:blocks-shuffle-3" className="text-[4rem]" /> */}
      <Icon icon="svg-spinners:3-dots-scale" className="text-[4rem]" />
    </div>
  )
}
