import React, { Suspense } from 'react';
import Link from 'next/link';
// import { projectCategories } from "@/common";
import FadeInContainer from './FadeInContainer';
import { projectCategoryType } from "@/common/categories.type";
import { cn } from '@/lib/utils';

type NavbarType = {
  categories: projectCategoryType[];
  pathname: string;
  category?: string
}

const Navbar = ({ categories, pathname, category }: NavbarType) => {
  const categoryParam = category || null

  return (
    <Suspense>
      <nav className='mt-10 flex flex-col gap-8'>
        <Link href={"/"}>
          <div className='flex flex-col justify-center items-center gap-3'>
            <div className='flex justify-end w-[270px]'>
              <FadeInContainer className='flex justify-end' isReverse>
                <div className='flex gap-1'>
                  <div className='bg-[#C44302] rounded-full w-[15px] h-[15px]'></div>
                  <div className='bg-[#B7BF99] rounded-full w-[15px] h-[15px]'></div>
                  <div className='bg-[#EDAA25] rounded-full w-[15px] h-[15px]'></div>
                </div>
              </FadeInContainer>
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
        </Link>

        <div className='max-w-[70rem] lg:w-auto w-[90%] overflow-x-scroll mx-auto p-2 sm:scrollbar-hide scrollbar-thin scrollbar-webkit'>
          <div
            className='flex md:gap-9 gap-4 whitespace-nowrap flex-nowrap w-full'
          >
            <Link
              href={`/`}
              className={cn(
                'text-[1.3rem] font-semibold text-[rgb(128,128,128)]',
                pathname === `/` && !categoryParam && 'text-[rgb(237,170,37)]',
              )}
            >
              <>ALL</>
            </Link>
            {categories?.sort((a, b) => a.position! - b.position!)?.map((categoryItem: projectCategoryType, index: number) => {
              return (
                <Link
                  key={index}
                  href={`/${categoryItem?.slug}`}
                  // href={`${category.key === "all" ? "/" : `?category=${category.key}`}`}
                  className={cn(
                    'text-[1.3rem] font-semibold text-[rgb(128,128,128)] hover:text-[rgb(183,191,153)] transition-all duration-300',
                    categoryParam === `${categoryItem.slug}` && 'text-[rgb(237,170,37)]',
                    pathname === `/` && categoryItem.slug === "all" && !categoryParam && 'text-[rgb(237,170,37)]',
                  )}
                >
                  <>{categoryItem.name.toUpperCase()}</>
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
    </Suspense>
    
  )
}

export default Navbar;
