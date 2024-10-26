"use client";

import React from 'react';
import Link from 'next/link';
import { projectCategories } from "@/common";
import { projectCategoryType } from "@/common/categories.type";
import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavbarType = {
  categories: projectCategoryType[]
}

const Navbar = ({ categories }: NavbarType) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const pathname = usePathname()
  console.log({pathname})

  let href = ""

  const getHref = (key: string) => {
    if (pathname !== '/') {
      if (key === 'all') return '/'
      else return `/?category=${key}`
    } else {
      if (key === 'all') return '/'
      else return `?category=${key}`
    }
  }

  
  // console.log({categories, router: router.query})
  return (
    <nav className='my-10 flex flex-col gap-8'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='flex justify-end w-[260px]'>
          <div className='flex gap-1'>
            <div className='bg-[#B7BF99] rounded-full w-[15px] h-[15px]'></div>
            <div className='bg-[#EDAA25] rounded-full w-[15px] h-[15px]'></div>
            <div className='bg-[#C44302] rounded-full w-[15px] h-[15px]'></div>
          </div>
        </div>
        
        <div className='flex flex-col items-center'>
          <p className='text-3xl text-white font-semibold'>RIFKY B. PRASETIA</p>
          <div className='italic text-[18px] font-extralight flex gap-1'>
            <aside className='text-[#C44302]'>cinematographer</aside>
            <aside className='text-[#EDAA25]'>colorist</aside>
            <aside className='text-[#B7BF99]'>editor</aside>
          </div>
        </div>
      </div>

      <div className='max-w-[70rem] lg:w-auto w-[90%] overflow-x-scroll mx-auto p-2'>
        <div className='flex md:justify-center md:gap-9 gap-4 md:min-w-[60rem] min-w-[52rem] w-full overflow-scroll'>
          {categories?.map((category: projectCategoryType, index: number) => {
            return (
              <Link
                key={index}
                href={getHref(category.key)}
                // href={`${category.key === "all" ? "/" : `?category=${category.key}`}`}
                className={cn(
                  'text-[1.3rem] font-semibold text-[rgb(128,128,128)] hover:text-[rgb(183,191,153)] transition-all duration-300',
                  categoryParam === `${category.key}` && 'text-[rgb(237,170,37)]',
                  pathname === `/` && category.key === "all" && !categoryParam && 'text-[rgb(237,170,37)]',
                )}
              >
                <>{category.name.toUpperCase()}</>
              </Link>
            )
          })}
          <Link
            key={categories.length}
            href={`/contact`}
            className={cn(
              'text-[1.3rem] font-semibold text-[rgb(128,128,128)]',
              pathname === `/contact` && 'text-[rgb(237,170,37)]',
            )}
          >
            <>CONTACT</>
          </Link>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar;
