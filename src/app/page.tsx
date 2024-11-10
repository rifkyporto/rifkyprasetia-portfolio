import React from "react";
// import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase";
import Layout from "@/components/Layout";
// import { projectCategories } from '@/common';
import { projectCategoryType } from '@/common/categories.type';
import ProjectCard from "@/components/ProjectCard";
import { removeDuplicatesByKey } from "@/lib/utils";
import { IProjectCategories } from "@/common/projects.type";

export const dynamic = 'force-static';

export default async function Home() {
  // const supabase = createClient();

  const { data: projects } = await supabase
    .from('project_categories')
    .select(`
      *,
      projects (*)
    `)

  const allProjects: IProjectCategories[] = Object.values(
    projects!.reduce((acc, item) => {
        acc[item.project_id] = item;
        return acc;
    }, {}));

  const projectShow = allProjects?.map((project) => {
    return project.projects;
  })

  projectShow?.sort((a, b) => a?.position - b?.position)

  return (
    <Layout pathname="/">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[8px]">
        {projectShow?.map((project) => {
          return (
            <ProjectCard project={project} />
          )
        })}

        {!projects?.length && (
          <p className="text-lg">No project.</p>
        )}
      </div>
    </Layout>
  );
}

// export async function generateStaticParams() {
//   return {
//     next: { revalidate: 60 }, // Revalidate the page every 60 seconds
//   };
// }
