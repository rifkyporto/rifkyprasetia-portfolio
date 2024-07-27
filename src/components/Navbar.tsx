import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className='my-10'>
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
          <p className='italic text-[22px] font-extralight flex gap-1'>
            <aside className='text-[#C44302]'>cinematografer</aside>
            <aside className='text-[#EDAA25]'>colorist</aside>
            <aside className='text-[#B7BF99]'>editor</aside>
          </p>
        </div>
      </div>

    </nav>
  )
}

export default Navbar;
