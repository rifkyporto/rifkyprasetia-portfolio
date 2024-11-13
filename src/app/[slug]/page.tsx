import React, { Suspense } from "react";
// import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase";
// import { createClient } from "@supabase/supabase-js";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { IProjectCategories } from "@/common/projects.type";
import { projectCategoryType } from "@/common/categories.type";
import FullPageLoading from "@/components/FullPageLoading";

export const revalidate = 1000;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { data: categories } = await supabase
    .from('category')
    .select('*');

  return categories?.map((category) => ({
    slug: category.slug || category.id.toString(),
  })) ?? [];
}

export default async function HomeSlug({ params }: { params: { slug: string } }) {
  const { data: categoryData } = await supabase
    .from('category')
    .select('slug')
    .eq('slug', params.slug)
    .single();

  const categoryId = categoryData?.slug;

  const category = categoryData?.slug

  const { data: projects } = await supabase
    .from('project_categories')
    .select(`
      *,
      projects (*)
    `)
    .eq('category_id', categoryId)

  projects?.sort((a, b) => a?.position - b?.position)

  const allProjects: IProjectCategories[] = Object.values(
    projects!.reduce((acc, item) => {
        acc[item.project_id] = item;
        return acc;
    }, {}));

  const projectShow = allProjects?.map((project) => {
    return project.projects;
  })

  return (
    <Suspense fallback={<FullPageLoading />}>
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
    </Suspense>
  );
}
