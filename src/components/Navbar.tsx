import React from 'react';
import Link from 'next/link';
import { projectCategories } from "@/common";
import { projectCategoryType } from "@/common/categories.type";

type NavbarType = {
  categories: projectCategoryType[]
}

const Navbar = ({ categories }: NavbarType) => {
  console.log({categories})
  return (
    <nav className='my-10 flex flex-col gap-8'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='flex justify-end w-[312px]'>
          <div className='flex gap-1'>
            <div className='bg-[#B7BF99] rounded-full w-[20px] h-[20px]'></div>
            <div className='bg-[#EDAA25] rounded-full w-[20px] h-[20px]'></div>
            <div className='bg-[#C44302] rounded-full w-[20px] h-[20px]'></div>
          </div>
        </div>
        
        <div className='flex flex-col items-center'>
          <p className='text-4xl text-white font-semibold'>RIFKY B. PRASETIA</p>
          <div className='italic text-[20px] font-extralight flex gap-1'>
            <aside className='text-[#C44302]'>cinematografer</aside>
            <aside className='text-[#EDAA25]'>colorist</aside>
            <aside className='text-[#B7BF99]'>editor</aside>
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-5'>
        {categories?.map((category: projectCategoryType, index: number) => {
          return (
            <Link key={index} href={`/${category.key}`} className='text-[1.3rem] font-semibold text-[rgb(128,128,128)]'>
              <>{category.name.toUpperCase()}</>
            </Link>
          )
        })}
        <Link key={categories.length} href={`/profile`} className='text-[1.3rem] font-semibold text-[rgb(128,128,128)]'>
          <>CONTACT</>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
