import React, { Suspense } from "react";
import supabase from "@/utils/supabase";
import Layout from "@/components/Layout";
import { Icon } from "@iconify/react";
import { SOCIALLIST } from "@/lib/configs";
import FullPageLoading from "@/components/FullPageLoading";
export const dynamic = 'force-static';
// export const revalidate = 0
const Contact = async () => {
  const { data: profile } = await supabase
    .from('profile')
    .select(`
      *
    `)
    .eq('id', process.env.NEXT_PUBLIC_SUPABASE_USER_ID)

  const { data: socials } = await supabase
    .from('social')
    .select(`
      *
    `)
    .eq('is_show_contact_page', true)
  console.log({profile, socials})
  const profileData = profile?.[0];

  return (
    <Suspense fallback={<FullPageLoading />}>
      <Layout pathname="/contact">
        <div className="h-[440px] lg:flex hidden">
          <div className="w-[50%] h-full flex flex-col justify-center items-end gap-3 text-right pr-[5rem]">
            <p className="text-2xl font-semibold">{profileData?.display_name}</p>
            <div className="flex flex-col gap-1">
              <p>{profileData?.email}</p>
              <p>{profileData?.mobile}</p>
              <div className="flex flex-col gap-2 my-1">
                {socials?.map((social) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <Icon className="text-2xl" icon={SOCIALLIST?.find((socialItem) => socialItem?.socialKey === social?.key)?.logo!}/>
                      <p>{social?.username}</p>
                    </div>
                  )
                })}
              </div>
              {/* <p>@rifkyprasetia</p> */}
            </div>
          </div>
          <img
            className="w-[50%] h-full object-cover"
            src={profileData?.profile_img}
            // src="https://static.wixstatic.com/media/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png/v1/fill/w_1200,h_440,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png"
            alt="rifky prasetya"
          />
        </div>
        <div className="flex lg:hidden h-[400px]"
          style={{
            // backgroundImage: `url("https://static.wixstatic.com/media/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png/v1/fill/w_1200,h_440,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png")`,
            backgroundImage: `url(${profileData?.profile_img})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="w-full h-full flex flex-col justify-center mt-20 items-end gap-3 text-right sm:pr-[5rem] pr-5">
            <p className="text-4xl font-semibold">{profileData?.display_name}</p>
            <div className="flex flex-col gap-1 text-xl">
              {/* {socials?.map((social) => {
                return (
                  <div>
                  
                  </div>
                )
              })} */}
              <p>@rifkyprasetya</p>
              <p>{profileData?.email}</p>
              <p>{profileData?.mobile}</p>
            </div>
          </div>
        </div>
      </Layout>
    </Suspense>
  );
}

export default Contact;
