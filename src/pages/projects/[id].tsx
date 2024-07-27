import React from 'react'
import Layout from '@/components/Layout';
import { projectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data

interface HomePageProps {
  categories: projectCategoryType[];
}

export async function getStaticPaths() {
  const paths = projectCategories().map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false, // Change to true or "blocking" for ISR
  };
}

const ProjectDetail: React.FC<HomePageProps> = ({ categories }) => {
  return (
    <Layout categories={categories} >
      <div className=''>
        <div
          className="relative w-full h-screen flex justify-center items-center bg-center bg-cover"
          style={{
            backgroundImage: "url('https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_972,h_548,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
          <div className="relative z-10 text-center text-white p-4">
              <h1 className="text-4xl font-bold mb-2">Welcome to My Website</h1>
              <p className="text-lg">Here is some overlay text on the background image.</p>
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
