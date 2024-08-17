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

const Contact: React.FC<HomePageProps> = () => {
  const categories: projectCategoryType[] = projectCategories;

  return (
    <Layout categories={categories} >
      <div className="flex h-[440px]">
        <div className="w-[50%] h-full flex flex-col justify-center items-end gap-3 text-right pr-[5rem]">
          <p className="text-2xl font-semibold">Rifky B. Prasetya</p>
          <div className="flex flex-col gap-1">
            <p>tararifky@live.com</p>
            <p>+62 895-0279-1116</p>
            <p>@rifkyprasetya</p>
          </div>
        </div>
        <img className="w-[50%] h-full object-cover" src="https://static.wixstatic.com/media/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png/v1/fill/w_1200,h_440,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png" alt="rifky prasetya" />
      </div>
    </Layout>
  );
}

export default Contact;
