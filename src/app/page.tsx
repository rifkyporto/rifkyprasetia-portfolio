import React from "react";
import { createClient } from "@/utils/supabase/server";
import Layout from "@/components/Layout";
import { projectCategories } from '@/common';
import { projectCategoryType } from '@/common/categories.type';
import ProjectCard from "@/components/ProjectCard";
// import { useSearchParams } from "next/navigation";
interface HomePageProps {
  categories: projectCategoryType[];
}

export const dynamic = "force-dynamic";

// This function will be called on the server during the build
export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
  const supabase = createClient();
  // const searchParam = useSearchParams();
  const category = searchParams?.category
  console.log({category})
  let query = supabase
    .from('project_categories') // Adjust this to your table name
    .select(`
      *,
      projects (*)
    `)
    // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    // .ilike("category_id", `%${typeQuery}%`)

  // let query = await supabase
  //   .from('project_categories')
  //   .select(`
  //     *,
  //     projects (id, title, position, cover_image_url, role, date_month_project)
  //   `)
  //   .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    // .ilike("projects.title", `%${searchQuery}%`)
    // .ilike("category_id", `%${typeQuery}%`)

  if (category) {
    query = query.eq('category_id', category);
  }

  const { data: projects, error } = await query

  console.log({projects})

  if (category) {
    projects?.sort((a, b) => a?.position - b?.position)
  }

  const allProjects = projects?.map((project) => {
    return project.projects;
  })

  if (!category) {
    allProjects?.sort((a, b) => a?.position - b?.position)
  }

  // Fetch or import the data
  const categories: projectCategoryType[] = projectCategories;

  return (
    <Layout categories={categories} >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:gap-3 gap-5">
        {allProjects?.map((project) => {
          return (
            <ProjectCard project={project} />
          )
        })}

        {!projects?.length && (
          <p className="text-lg">No project.</p>
        )}
        {/* <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> */}
      </div>
    </Layout>
  );
}

// export async function generateStaticParams() {
//   return {
//     next: { revalidate: 60 }, // Revalidate the page every 60 seconds
//   };
// }
