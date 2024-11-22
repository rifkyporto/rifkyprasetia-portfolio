// "use client";

import React, { Suspense } from 'react'
// import { createClient } from "@/utils/supabase/server";
import supabase from '@/utils/supabase';
import Layout from '@/components/Layout';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import FadeInContainer from '@/components/FadeInContainer';
import { AdditionalFieldType, IProject, IProjectCategories } from '@/common/projects.type';
import FullPageLoading from '@/components/FullPageLoading';
import ProjectDetailClient from '@/components/pages/ProjectDetail';
import ProjectDetailContainer from '@/components/pages/ProjectDetail/container';
import { IShowcaseProject } from '@/common/showcase.type';

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = true;

export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      id
    `)
  if (!projects || !projects.length) return []

  return projects.map((item) => ({
    slug: item.id,
  }))
}

interface HomePageProps {
  params: {
    slug: string;
  };
}

// const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
  // const { slug } = params;

  // const [project, setProject] = useState<Partial<IProject> | null>()
  // const [additionalFields, setAdditionalFields] = useState<AdditionalFieldType[]>([])
  // const [showcase, setShowcase] = useState<IShowcaseProject[]>();
  // const [pc, setPc] = useState<Partial<IProjectCategories>[]>()

  const { slug } = params

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
      banner_Xaxis,
      banner_Yaxis,
      showcase_project (is_video, link)
    `)
    // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    .eq('id', slug)
    .returns<IProject[]>();

  /*
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
      banner_Xaxis,
      banner_Yaxis,
      showcase_project (is_video, link)
  */
  
  const project: Partial<IProject> | null = data?.[0] as Partial<IProject> | null;
  const additionalFields = project?.additional_fields ? JSON.parse(project?.additional_fields) : []
  const showcase = project && project.showcase_project;
  console.log({project})
  const { data: pc } = await supabase
    .from('project_categories')
    .select(`
      id,
      category (name)
    `)
    .eq('project_id', slug)

  console.log({project, showcase, pc})

  // useEffect(() => {
  //   fetchSupabase()
  // }, [])

  // const fetchSupabase = async () => {
  //   const { data, error } = await supabase
  //     .from('projects')
  //     .select(`
  //       id,
  //       title,
  //       link_teaser,
  //       client_name,
  //       category_label,
  //       banner_url,
  //       cover_image_url,
  //       date_month_project,
  //       role,
  //       additional_fields,
  //       category (name),
  //       showcase_project (is_video, link)
  //     `)
  //     // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
  //     .eq('id', slug)
  //     .returns<IProject[]>();

  //   const { data: pc } = await supabase
  //     .from('project_categories')
  //     .select(`
  //       id,
  //       category (name)
  //     `)
  //     .eq('project_id', slug)

  //   setProject(data?.[0])
  //   setAdditionalFields(data?.[0]?.additional_fields ? JSON.parse(data?.[0]?.additional_fields) : [])
  //   setShowcase(data?.[0]?.showcase_project ? data?.[0].showcase_project : [])
  //   setPc(pc!)
  // }

  // console.log({project, showcase})
  // console.log({ee:})
  return (
    <Suspense fallback={<FullPageLoading />}>
      <Layout pathname='/projects'>
        {/* {project && pc && (
          <ProjectDetailClient
            project={project!}
            additionalFields={additionalFields}
            pc={pc!}
            showcase={showcase!}
          />
        )} */}

        {/* <ProjectDetailContainer params={params}/> */}
          {/* min-h-[50rem] max-h-[75rem] */}
        <div className=''>
          <div
            className="relative w-full h-screen min-h-[55rem] max-h-[80rem] flex justify-start items-end bg-no-repeat bg-cover background-image"
            style={{
              backgroundImage: `url("${project?.banner_url || project?.cover_image_url}")`,
              backgroundPosition: `${project?.banner_Xaxis || 50}% ${project?.banner_Yaxis || 50}%`
            }}
          >
            <div className='overflow-hidden h-full relative lg:w-full w-[95%] max-w-[64rem] mx-auto z-10'>
              <div className='relative overflow-hidden h-full w-full'>
              <div className='absolute inset-0'>

                <div className='absolute flex w-full justify-between items-center bottom-[20%]'>
                  <FadeInContainer>
                  <div className="md:w-[40rem] bottom-[20%] z-10 text-center text-white sm:p-4 p-2 flex items-end">
                    <h1 className="md:text-6xl text-5xl font-bold text-start mb-2 leading-[5rem]">{project?.title}</h1>
                  </div>
                  </FadeInContainer>
                  <div className='relative right-10 md:block hidden animate-[fadeIn_0.50s_ease-in_forwards] opacity-0'>
                    <a href={project?.link_teaser} target='_blank'>
                      <Button variant={'secondary'} className='bg-white text-black'>
                        <Icon icon="zondicons:play" className='text-[1.5rem]' />
                        Watch
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              </div>


            </div>
          </div>

          <div className='-translate-y-40 flex gap-[10rem] max-w-[62rem] lg:w-auto w-[90%] mx-auto z-[100]'>
            <div className='flex flex-col gap-8 w-[40%]'>
              <div>
                <p className='font-bold'>Project Type</p>
                <p className='text-[0.9rem] font-extralight'>
                  {project?.category_label  
                    ? project?.category_label 
                    : pc?.map((category, idx) => {
                      console.log({category})
                      //@ts-ignore
                      if (pc.length > 1 && idx < pc.length -1) return `${category?.category?.name} / `
                      //@ts-ignore
                      return category?.category?.name
                    })
                  }
                  
                </p>
              </div>
              {project?.client_name && (
                <div>
                  <p className='font-bold'>Client</p>
                  <p className='text-[0.9rem] font-extralight'>{project?.client_name}</p>
                </div>
              )}
              {additionalFields?.map((fields: { id: string, value: string, label: string }, idx: number) => {
                if (idx % 2 !== 0) {
                  return ""
                }

                return (
                  <div>
                    <p className='font-bold'>{fields?.label}</p>
                    {/* <p className='text-[0.9rem] font-extralight'>{fields?.value}</p> */}
                    <div className={'text-[0.9rem] font-extralight'}>
                      {fields?.value?.split(/\r?\n/).map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {fields?.value && i !== fields?.value?.split(/\r?\n/).length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col gap-8 w-[40%]'>
              <div>
                <p className='font-bold'>Date</p>
                <p className='text-[0.9rem] font-extralight'>{project?.date_month_project}</p>
              </div>
              <div>
                <p className='font-bold'>Role</p>
                {/* <p className='text-[0.9rem] font-extralight'>{project?.role}</p> */}
                <div className={'text-[0.9rem] font-extralight'}>
                  {project?.role?.split(/\r?\n/).map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {project?.role && i !== project?.role?.split(/\r?\n/).length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                {/* <div className="text-[0.9rem] font-extralight" dangerouslySetInnerHTML={{ __html: project?.role! }} /> */}
              </div>
              {additionalFields?.map((fields: { id: string, value: string, label: string }, idx: number) => {
                if (idx % 2 === 0) {
                  return ""
                }

                return (
                  <div>
                    <p className='font-bold'>{fields?.label}</p>
                    <div className={'text-[0.9rem] font-extralight'}>
                      {fields?.value?.split(/\r?\n/).map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {fields?.value && i !== fields?.value?.split(/\r?\n/).length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    {/* <p className='text-[0.9rem] font-extralight'>{fields?.value}</p> */}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='w-[91%] mx-auto max-w-[62rem] md:hidden flex justify-end -translate-y-20'>
            <a href={project?.link_teaser} target='_blank'>
              <Button variant={'secondary'} className='bg-white text-black'>
                <Icon icon="zondicons:play" className='text-[1.5rem]' />
                Watch
              </Button>
            </a>
          </div>
          <div className='flex flex-col gap-4 max-w-[62rem] lg:w-auto w-[90%] mx-auto'>
            {showcase?.length ? showcase?.map((show) => {
              if (!show.is_video) {
                return (
                  <img src={show.link} alt="" />
                )
              } else {
                return (
                  <iframe
                    width="100%"
                    height="500"
                    src={show?.link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )
              }
            })
              : ""
            }
          </div>
        </div>
        {/* <p>s</p> */}
      </Layout>
    </Suspense>
  )
}

export default ProjectDetail;
