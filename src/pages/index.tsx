import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { projectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data
import ProjectCard from "@/components/ProjectCard";
const inter = Inter({ subsets: ["latin"] });

interface HomePageProps {
  categories: projectCategoryType[];
}

const Home: React.FC<HomePageProps> = ({ categories }) => {
  return (
    <Layout categories={categories} >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </Layout>
  );
}

export default Home;

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