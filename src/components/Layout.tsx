import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps ) => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='my-5'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
