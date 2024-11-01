import React, { Suspense } from 'react'
// import { createClient } from "@/utils/supabase/server";
import supabase from '@/utils/supabase';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingComps from './loading-comps';

type LayoutProps = {
  children: React.ReactNode;
  pathname: string;
  category?: string;
};

const Layout = async ({ children, pathname, category }: LayoutProps ) => {
  // const supabase = createClient();
  const { data: dataCategory } = await supabase
    .from('category')
    .select(`
      *
    `)

  return (
    <div className='min-h-screen w-screen'>
      <Navbar categories={dataCategory!} pathname={pathname} category={category!} />
      <Suspense
        fallback={(<LoadingComps />)}
      >
        <div className='mb-10 mt-2'>
          {children}
        </div>
      </Suspense>
      <Footer />
    </div>
  )
}

export default Layout
