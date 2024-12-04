import React, { Suspense } from "react";
// import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase";
import Layout from "@/components/Layout";
// import { projectCategories } from '@/common';
import { projectCategoryType } from '@/common/categories.type';
import ProjectCard from "@/components/ProjectCard";
import { removeDuplicatesByKey } from "@/lib/utils";
import { IProjectCategories } from "@/common/projects.type";
import FullPageLoading from "@/components/FullPageLoading";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false
export const dynamicParams = true;

type Props = {
  params: {
    slug: string;
    locale: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  
  return {
    title: `Projects | Rifky Prasetia`,
    icons: "/icon-metadata.png",
    description: "",
    keywords: "rifky, rifkyprasetia, rifky prasetia, editor, videographer, photograper, colorist, chandra liow, andovi dalopez",
  };
};

export default async function Home() {
  // const supabase = createClient();

  const { data: projects } = await supabase
    .from('project_categories')
    .select(`
      *,
      projects (*, slug)
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
    <Suspense fallback={<FullPageLoading />}>
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
    </Suspense>
  );
}
