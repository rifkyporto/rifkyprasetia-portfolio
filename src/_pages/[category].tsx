import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { projectCategories, getAllProjectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data
import ProjectCard from "@/components/ProjectCard";
const inter = Inter({ subsets: ["latin"] });


export async function getStaticPaths() {
  const paths = getAllProjectCategories().map((key) => ({
    params: { category: key.toString() },
  }));

  return {
    paths,
    fallback: false, // Change to true or "blocking" for ISR
  };
}

interface HomePageProps {
  categories: projectCategoryType[];
}

const CategoryProject: React.FC<HomePageProps> = ({ categories }) => {
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

export default CategoryProject;

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