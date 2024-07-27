import React from 'react'
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col gap-10'>
      <div className='flex justify-center gap-20'>
        <div className='flex flex-col gap-4 w-[15rem]'>
          <p className='text-2xl font-semibold text-[#C44302]'>About</p>
          <div>
            <p className='font-thin'>Cinematographer, Colorist, and <br/> Editor Based in Jakarta</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl font-semibold text-[#EDAA25]'>Socials</p>
          <div>
            <Icon icon="akar-icons:instagram-fill" className='text-2xl mx-auto' />
          </div>
        </div>
        <div className='flex flex-col gap-4 w-[15rem]'>
          <p className='text-2xl font-semibold text-[#B7BF99]'>Contact</p>
          <div className='font-thin'>
            <p>tararifky@live.com</p>
            <p>+62 895-0279-1116</p>
          </div>
        </div>
      </div>
      
      <div className='flex flex-col justify-center items-center gap-3'>
        <p className='font-thin text-white text-center'>&copy;2024 Rifky B. Prasetia</p>
        <div className='flex gap-1'>
          <div className='bg-[#C44302] rounded-full w-[20px] h-[20px]'></div>
          <div className='bg-[#EDAA25] rounded-full w-[20px] h-[20px]'></div>
          <div className='bg-[#B7BF99] rounded-full w-[20px] h-[20px]'></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
