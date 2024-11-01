import React from "react";
// import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase";
// import { createClient } from "@supabase/supabase-js";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { IProjectCategories } from "@/common/projects.type";
import { projectCategoryType } from "@/common/categories.type";

export const revalidate = 1000;
export const dynamicParams = true;

export async function generateStaticParams() {
  // const supabase = createClient();
  const { data: dataCategory } = await supabase
    .from('category')
    .select(`
      *
    `)

  return dataCategory?.map((slug: projectCategoryType) => ({
    slug: slug?.slug,
  }));
  // []
}

export default async function HomeSlug({ params }: { params: { slug: string } }) {
  // const supabase = createClient();

  const category = params.slug
  console.log({category})
  let query = supabase
    .from('project_categories')
    .select(`
      *,
      projects (*)
    `)

  if (category) {
    query = query.eq('category_id', category);
  }

  const { data: projects, error } = await query

  if (category) {
    projects?.sort((a, b) => a?.position - b?.position)
  }

  const allProjects: IProjectCategories[] = Object.values(
    projects!.reduce((acc, item) => {
        acc[item.project_id] = item;
        return acc;
    }, {}));

  const projectShow = allProjects?.map((project) => {
    return project.projects;
  })

  return (
    <Layout pathname="/" category={category}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
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
