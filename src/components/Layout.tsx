import React from 'react'
import { createClient } from "@/utils/supabase/server";
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps ) => {
  const supabase = createClient();
  const { data: dataCategory } = await supabase
    .from('category')
    .select(`
      *
    `)

  return (
    <div className='min-h-screen w-screen'>
      <Navbar categories={dataCategory!} />
      <div className='mb-10 mt-2'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
