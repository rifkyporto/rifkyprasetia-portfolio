import React from 'react'
import Layout from '@/components/Layout';
import { projectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data

interface HomePageProps {
  categories: projectCategoryType[];
}

const ProjectDetail: React.FC<HomePageProps> = ({ categories }) => {
  return (
    <Layout categories={categories} >
      <div className='max-w-[55rem] mx-auto'>
        <div
          className="relative w-full h-screen flex justify-start items-end bg-center bg-no-repeat bg-cover background-image"
          style={{
            backgroundImage: "url('https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_1000,h_576,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp')"
          }}
        >
          <div className="w-[28rem] ml-[5rem] mb-[10rem] z-10 text-center text-white p-4">
            <h1 className="text-6xl font-bold text-start mb-2 leading-[5rem]">#Jembatan by Chandra Liow</h1>
          </div>
        </div>
        <div className='flex gap-[10rem] my-20'>
          <div className='flex flex-col gap-8'>
            <div>
              <p className='font-bold'>Project Type</p>
              <p className='text-[0.9rem] font-extralight'>Short Film/Narrative</p>
            </div>
            <div>
              <p className='font-bold'>Role</p>
              <p className='text-[0.9rem] font-extralight'>Director of Photography & Colorist</p>
            </div>
            <div>
              <p className='font-bold'>Client</p>
              <p className='text-[0.9rem] font-extralight'>Chandra Liow</p>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div>
              <p className='font-bold'>Date</p>
              <p className='text-[0.9rem] font-extralight'>May 2024</p>
            </div>
            <div>
              <p className='font-bold'>Watch</p>
              <p className='text-[0.9rem] font-extralight underline'>Click here</p>
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default ProjectDetail;

// Implement getStaticProps to use SSG
export async function getStaticProps() {
  // Fetch or import the data for SSG
  const categories = projectCategories; // This could be an API call if needed

  return {
    props: {
      categories,
    },
  };
}
