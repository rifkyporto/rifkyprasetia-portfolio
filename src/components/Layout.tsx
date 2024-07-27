import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { projectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data

type LayoutProps = {
  children: React.ReactNode;
  categories: projectCategoryType[];
};

const Layout = ({ children, categories }: LayoutProps ) => {
  return (
    <div className='min-h-screen'>
      <Navbar categories={categories} />
      <div className='my-5'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
