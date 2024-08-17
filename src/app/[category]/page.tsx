import React from "react";
import Layout from "@/components/Layout";
import { projectCategories } from '@/common';
import { projectCategoryType } from '@/common/categories.type';
import ProjectCard from "@/components/ProjectCard";

interface HomePageProps {
  categories: projectCategoryType[];
}

// This function will be called on the server during the build
export default async function Home() {
  // Fetch or import the data
  const categories: projectCategoryType[] = projectCategories;

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
