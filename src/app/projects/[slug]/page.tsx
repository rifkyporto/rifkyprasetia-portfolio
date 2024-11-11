import React from 'react'
// import { createClient } from "@/utils/supabase/server";
import supabase from '@/utils/supabase';
import Layout from '@/components/Layout';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import FadeInContainer from '@/components/FadeInContainer';
import { IProject } from '@/common/projects.type';

export const revalidate = 1000;
export const dynamicParams = true;

export async function generateStaticParams() {
  return []
}

interface HomePageProps {
  // categories: projectCategoryType[];
  params: {
    slug: string;
  };
}

const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
  // const categories: projectCategoryType[] = projectCategories;
  const { slug } = params

  let query = supabase
    .from('projects')
    .select(`
      *,
      category (name),
      showcase_project (*)
    `)
    // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    .eq('id', slug)

  const { data, error } = await query
  const project: IProject = data?.length ? data[0] : null;
  const showcase = project && project.showcase_project;

  const { data: pc } = await supabase
    .from('project_categories')
    .select(`
      id,
      category (name)
    `)
    // .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    .eq('project_id', slug)

  console.log({project, showcase, pc})
  return (
    <Layout pathname='/projects'>
      <div className=''>
        {/* <div className='relative w-full mb-32'> */}
          <div
            className="relative w-full h-screen min-h-[50rem] max-h-[65rem] flex justify-start items-end bg-center bg-no-repeat bg-cover background-image"
            style={{
              backgroundImage: `url("${project?.banner_url || project?.cover_image_url}")`
            }}
          >
            <div className='overflow-hidden h-full relative lg:w-full w-[95%] max-w-[64rem] mx-auto z-10'>
              <FadeInContainer>
                <div className='absolute flex w-full justify-between items-center bottom-[20%]'>
                  <div className="md:w-[40rem] bottom-[20%] z-10 text-center text-white p-4 flex items-end">
                    <h1 className="md:text-6xl text-5xl font-bold text-start mb-2 leading-[5rem]">{project?.title}</h1>
                  </div>
                  <div className='relative right-10 md:block hidden animate-[fadeIn_1.5s_ease-in_1s_forwards] opacity-0'>
                    <a href={project?.link_teaser} target='_blank'>
                      <Button variant={'secondary'} className='bg-white text-black'>
                        <Icon icon="zondicons:play" className='text-[1.5rem]' />
                        Watch
                      </Button>
                    </a>
                  </div>
                </div>
              </FadeInContainer>
            </div>
          </div>
          
          {/* <div className='absolute bottom-0 flex gap-[10rem] mb-52 max-w-[62rem] lg:w-auto w-[90%] mx-auto'>
            <div className='flex flex-col gap-8'>
              <div>
                <p className='font-bold'>Project Type</p>
                <p className='text-[0.9rem] font-extralight'>
                  {pc?.map((category, idx) => {
                    console.log({category})
                    //@ts-ignore
                    if (pc.length > 1 && idx < pc.length -1) return `${category?.category?.name} / `
                    //@ts-ignore
                    return category?.category?.name
                  })}
                </p>
              </div>
              <div>
                <p className='font-bold'>Role</p>
                <p className='text-[0.9rem] font-extralight'>{project?.role}</p>
              </div>
              <div>
                <p className='font-bold'>Client</p>
                <p className='text-[0.9rem] font-extralight'>{project?.client_name}</p>
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              <div>
                <p className='font-bold'>Date</p>
                <p className='text-[0.9rem] font-extralight'>{project?.date_month_project}</p>
              </div>
              <div>
                <p className='font-bold'>Watch</p>
                <p className='text-[0.9rem] font-extralight underline'><a href={project?.link_teaser} target='_blank'>Click here</a></p>
              </div>
            </div>
          </div> */}
        {/* </div> */}
        <div className='-translate-y-40 flex gap-[10rem] max-w-[62rem] lg:w-auto w-[90%] mx-auto z-[100]'>
          <div className='flex flex-col gap-8'>
            <div>
              <p className='font-bold'>Project Type</p>
              <p className='text-[0.9rem] font-extralight'>
                {pc?.map((category, idx) => {
                  console.log({category})
                  //@ts-ignore
                  if (pc.length > 1 && idx < pc.length -1) return `${category?.category?.name} / `
                  //@ts-ignore
                  return category?.category?.name
                })}
              </p>
            </div>
            <div>
              <p className='font-bold'>Client</p>
              <p className='text-[0.9rem] font-extralight'>{project?.client_name}</p>
            </div>
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
      
    </Layout>
  )
}

export default ProjectDetail;
