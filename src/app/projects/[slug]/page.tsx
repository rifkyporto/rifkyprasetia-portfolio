import React from 'react'
import { createClient } from "@/utils/supabase/server";

import Layout from '@/components/Layout';
import { projectCategories } from '@/common'; // Import the data
import { projectCategoryType } from '@/common/categories.type'; // Import the data
import FadeInContainer from '@/components/FadeInContainer';
import { IProject } from '@/common/projects.type';

interface HomePageProps {
  categories: projectCategoryType[];
  params: {
    slug: string;
  };
}

const ProjectDetail: React.FC<HomePageProps> = async ({ params }) => {
  const supabase = createClient();
  const categories: projectCategoryType[] = projectCategories;
  const { slug } = params

  let query = supabase
    .from('projects') // Adjust this to your table name
    .select(`
      *,
      category (name),
      showcase_project (*)
    `)
    .eq('user_id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)
    .eq('id', slug)
    // .innerJoin('users', 'projects.user_id', 'users.id');  // Joining the `users` table
    // .ilike("category_id", `%${typeQuery}%`)

  const { data, error } = await query
  const project: IProject = data?.length ? data[0] : null;
  const showcase = project && project.showcase_project;
  console.log({project, showcase})
  return (
    <Layout categories={categories} >
      <div className='max-w-[62rem] mx-auto'>
        <div
          className="relative w-full h-screen flex justify-start items-end bg-center bg-no-repeat bg-cover background-image"
          style={{
            // backgroundImage: "url('https://static.wixstatic.com/media/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.jpg/v1/fit/w_1000,h_576,q_90/d9f26d_bfde3c5382e841e290e1026b3784e532~mv2.webp')"
            backgroundImage: `url("${project?.cover_image_url}")`
          }}
        >
          <div className='overflow-hidden h-[20rem] w-full ml-20'>
            <FadeInContainer>
              <div className="w-[28rem] mb-[10rem] z-10 text-center text-white p-4 flex justify-end items-end">
                <h1 className="text-6xl font-bold text-start mb-2 leading-[5rem]">{project?.title}</h1>
              </div>
            </FadeInContainer>
          </div>

        </div>
        <div className='flex gap-[10rem] my-20'>
          <div className='flex flex-col gap-8'>
            <div>
              <p className='font-bold'>Project Type</p>
              <p className='text-[0.9rem] font-extralight'>{project.category.name}</p>
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
        </div>

        <div className='flex flex-col gap-4'>
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
