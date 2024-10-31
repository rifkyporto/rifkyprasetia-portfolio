import React, { Suspense } from 'react'
import { createClient } from "@/utils/supabase/server";
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingComps from './loading-comps';

type LayoutProps = {
  children: React.ReactNode;
  pathname: string;
  searchParams?: { category?: string };
};

const Layout = async ({ children, pathname, searchParams }: LayoutProps ) => {
  const supabase = createClient();
  const { data: dataCategory } = await supabase
    .from('category')
    .select(`
      *
    `)

  return (
    <div className='min-h-screen w-screen'>
      <Navbar categories={dataCategory!} pathname={pathname} searchParams={searchParams!} />
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
