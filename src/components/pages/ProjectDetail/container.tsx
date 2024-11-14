"use client";

import React, { Suspense, useEffect, useState } from 'react'
// import { createClient } from "@/utils/supabase/server";
import supabase from '@/utils/supabase';
import Layout from '@/components/Layout';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import FadeInContainer from '@/components/FadeInContainer';
import { AdditionalFieldType, IProject, IProjectCategories } from '@/common/projects.type';
import FullPageLoading from '@/components/FullPageLoading';
import ProjectDetailClient from '@/components/pages/ProjectDetail';
// import { useParams } from 'next/navigation';
import { IShowcaseProject } from '@/common/showcase.type';

// export const revalidate = 1000;
// export const dynamicParams = true;

// export async function generateStaticParams() {
//   return []
// }

interface HomePageProps {
  params: {
    slug: string;
  };
}

// const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
const ProjectDetailContainer = ({ params }: HomePageProps) => {
  const { slug } = params;

  const [project, setProject] = useState<Partial<IProject> | null>()
  const [additionalFields, setAdditionalFields] = useState<AdditionalFieldType[]>([])
  const [showcase, setShowcase] = useState<IShowcaseProject[]>();
  const [pc, setPc] = useState<Partial<IProjectCategories>[]>()
  // const { slug } = params

  // const { data, error } = await supabase
  //   .from('projects')
  //   .select(`
  //     id,
  //     title,
  //     link_teaser,
  //     client_name,
  //     category_label,
  //     banner_url,
  //     cover_image_url,
  //     date_month_project,
  //     role,
  //     additional_fields,
  //     category (name),
  //     showcase_project (is_video, link)
  //   `)
  //   // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
  //   .eq('id', slug)
  //   .returns<IProject[]>();

  // const project: Partial<IProject> | null = data?.[0] as Partial<IProject> | null;
  // const additionalFields = project?.additional_fields ? JSON.parse(project?.additional_fields) : []
  // const showcase = project && project.showcase_project;

  // const { data: pc } = await supabase
  //   .from('project_categories')
  //   .select(`
  //     id,
  //     category (name)
  //   `)
  //   .eq('project_id', slug)

  // console.log({project, showcase, pc})

  useEffect(() => {
    fetchSupabase()
  }, [])

  const fetchSupabase = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        link_teaser,
        client_name,
        category_label,
        banner_url,
        cover_image_url,
        date_month_project,
        role,
        additional_fields,
        category (name),
        showcase_project (is_video, link)
      `)
      // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
      .eq('id', slug)
      .returns<IProject[]>();

    const { data: pc } = await supabase
      .from('project_categories')
      .select(`
        id,
        category (name)
      `)
      .eq('project_id', slug)

    setProject(data?.[0])
    setAdditionalFields(data?.[0]?.additional_fields ? JSON.parse(data?.[0]?.additional_fields) : [])
    setShowcase(data?.[0]?.showcase_project ? data?.[0].showcase_project : [])
    setPc(pc!)
  }

  console.log({project, showcase})

  return (
    <>
      {project && pc && (
        <ProjectDetailClient
          project={project!}
          additionalFields={additionalFields}
          pc={pc!}
          showcase={showcase!}
        />
      )}
    </>
  )
}

export default ProjectDetailContainer;
