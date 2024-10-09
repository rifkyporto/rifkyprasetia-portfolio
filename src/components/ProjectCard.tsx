"use client";

import React, { MouseEventHandler, useState } from 'react'
import Link from 'next/link';
import { IProject } from '@/common/projects.type';
import { cn } from '@/lib/utils';
import Image from 'next/image'

interface ProjectCardType {
  className?: string;
  project: IProject;
}
const ProjectCard: React.FC<ProjectCardType> = ({ className, project }) => {
  const [isOverlayInspect, setIsOverlayInspect] = React.useState<boolean>(false)

  const handleOnMouseEnter: MouseEventHandler = () => {
    setIsOverlayInspect(true)
  }

  const handleOnMouseLeave: MouseEventHandler = () => {
    setIsOverlayInspect(false)
  }

  return (
    <Link href={`/projects/${project?.id}`} className={className}>
      <div
        className='relative z-0 h-auto cursor-pointer w-full'
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <img
          // src="https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_972,h_548,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp"
          src={project?.cover_image_url}
          alt={project?.title + " project"}
          // fill
          className={`dark:invert ${isOverlayInspect && "grayscale brightness-75 contrast-100"} transition-all ease-out duration-400 w-[100%] h-[250px] object-cover`}
          // width={320}
          // height={100}
          // priority
        />
        {isOverlayInspect && (
          <div className={cn(
            'absolute w-full h-full z-10 top-0 flex items-end transition-all duration-500'
          )}>
            <p
              className={cn(
                'text-white absolute m-5 text-2xl font-semibold transition-all duration-500',
                isOverlayInspect ? "block" : "hidden"
              )}
            >
              {project?.title}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProjectCard