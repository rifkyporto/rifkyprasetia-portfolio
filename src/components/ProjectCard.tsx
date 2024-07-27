import Image from 'next/image'
import React, { useState } from 'react'

interface ProjectCardType {
  className?: string;
}
const ProjectCard: React.FC = ({ className }: ProjectCardType) => {
  const [isOverlayInspect, setIsOverlayInspect] = React.useState<boolean>(false)

  const handleOnMouseEnter: MouseEventHandler = () => {
    setIsOverlayInspect(true)
  }

  const handleOnMouseLeave: MouseEventHandler = () => {
    setIsOverlayInspect(false)
  }

  return (
    <div className={className}>
      <div
        className='relative z-0 h-auto cursor-pointer'
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <img
          src="https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_972,h_548,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp"
          alt="Vercel Logo"
          // fill
          className={`dark:invert ${isOverlayInspect && "grayscale"} transition-all duration-500 ease-in-out w-[100%] h-auto`}
          // width={320}
          // height={100}
          // priority
        />
        {isOverlayInspect && (
          <div className='absolute w-full h-full z-10 top-0 flex items-end'>
            <p className='text-white absolute m-5 text-2xl font-semibold'>Chandra</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard