import React, { Suspense } from 'react'
// import { createClient } from "@/utils/supabase/server";
import supabase from '@/utils/supabase';
import Layout from '@/components/Layout';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import FadeInContainer from '@/components/FadeInContainer';
import { IProject } from '@/common/projects.type';
import FullPageLoading from '@/components/FullPageLoading';
import ProjectDetailClient from '@/components/pages/ProjectDetail';

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

const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
  const { slug } = params

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
  return (
    <Suspense fallback={<FullPageLoading />}>
      <Layout pathname='/projects'>
        {/* <ProjectDetailClient
          project={project!}
          additionalFields={additionalFields}
          pc={pc!}
          showcase={showcase!}
        /> */}
        {/* <div className=''>
            <div
              className="relative w-full h-screen min-h-[50rem] max-h-[75rem] flex justify-start items-end bg-center bg-no-repeat bg-cover background-image"
              style={{
                backgroundImage: `url("${project?.banner_url || project?.cover_image_url}")`
              }}
            >
              <div className='overflow-hidden h-full relative lg:w-full w-[95%] max-w-[64rem] mx-auto z-10'>
                <div className='relative overflow-hidden h-full w-full'>
                <div className='absolute inset-0'>

                  <div className='absolute flex w-full justify-between items-center bottom-[20%]'>
                    <FadeInContainer>
                    <div className="md:w-[40rem] bottom-[20%] z-10 text-center text-white p-4 flex items-end">
                      <h1 className="md:text-6xl text-5xl font-bold text-start mb-2 leading-[5rem]">{project?.title}</h1>
                    </div>
                    </FadeInContainer>
                    <div className='relative right-10 md:block hidden animate-[fadeIn_2s_ease-in_forwards] opacity-0'>
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
            <div className='flex flex-col gap-8'>
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
              <div>
                <p className='font-bold'>Client</p>
                <p className='text-[0.9rem] font-extralight'>{project?.client_name}</p>
              </div>
              {additionalFields?.map((fields: { id: string, value: string, label: string }, idx: number) => {
                if (idx % 2 !== 0) {
                  return ""
                }

                return (
                  <div>
                    <p className='font-bold'>{fields?.label}</p>
                    <p className='text-[0.9rem] font-extralight'>{fields?.value}</p>
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col gap-8'>
              <div>
                <p className='font-bold'>Date</p>
                <p className='text-[0.9rem] font-extralight'>{project?.date_month_project}</p>
              </div>
              <div>
                <p className='font-bold'>Role</p>
                <p className='text-[0.9rem] font-extralight'>{project?.role}</p>
              </div>
              {additionalFields?.map((fields: { id: string, value: string, label: string }, idx: number) => {
                if (idx % 2 === 0) {
                  return ""
                }

                return (
                  <div>
                    <p className='font-bold'>{fields?.label}</p>
                    <p className='text-[0.9rem] font-extralight'>{fields?.value}</p>
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
        </div> */}
        <p>s</p>
      </Layout>
    </Suspense>
  )
}

export default ProjectDetail;
