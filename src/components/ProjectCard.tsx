"use client";

import React, { MouseEventHandler, useState } from 'react'
import Link from 'next/link';
import { IProject } from '@/common/projects.type';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import { Icon } from '@iconify/react';

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
    <Link href={`/projects/${project?.id}`} className={cn('relative w-full', className)} prefetch={false}>
      <div
        className='relative z-0 cursor-pointer w-full pb-[56.25%]'
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{ aspectRatio: '16 / 9' }}
      >
        {/* <Icon icon="mdi:external-link" className='sm:hidden absolute right-3 top-3 z-[99999999] text-2xl' /> */}
        <Image
          // src="https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_972,h_548,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp"
          src={project?.cover_image_url}
          alt={project?.title + " project"}
          fill
          className={`absolute inset-0 dark:invert ${isOverlayInspect && "grayscale brightness-75 contrast-100"} transition-all ease-out duration-700 w-[100%] h-full object-cover`}
          // width={320}
          // height={100}
          priority
        />
        {isOverlayInspect && (
          <div className={cn(
            'sm:flex hidden absolute w-full h-full z-10 top-0 items-end transition-all duration-700'
          )}>
            <p
              className={cn(
                'text-white absolute m-5 text-2xl font-semibold transition-all duration-700',
                isOverlayInspect ? "block" : "hidden"
              )}
            >
              {project?.title}
            </p>
          </div>
        )}
        <div className="sm:hidden flex justify-between items-end absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent w-full">
          <p
            className={cn(
              'text-white mx-5 my-2 text-lg font-extralight transition-all duration-500 flex items-center',
            )}
          >
            {project?.title}
          </p>
          <Icon icon="weui:arrow-outlined" className='mx-5 my-2 text-lg' />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard