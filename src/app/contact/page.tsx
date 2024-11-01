import React, { Suspense } from "react";
import Layout from "@/components/Layout";

export const dynamic = 'force-static';

const Contact = async () => {
  return (
    <Suspense>
      <Layout pathname="/contact">
        <div className="h-[440px] lg:flex hidden">
          <div className="w-[50%] h-full flex flex-col justify-center items-end gap-3 text-right pr-[5rem]">
            <p className="text-2xl font-semibold">Rifky B. Prasetia</p>
            <div className="flex flex-col gap-1">
              <p>tararifky@live.com</p>
              <p>+62 895-0279-1116</p>
              <p>@rifkyprasetya</p>
            </div>
          </div>
          <img className="w-[50%] h-full object-cover" src="https://static.wixstatic.com/media/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png/v1/fill/w_1200,h_440,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png" alt="rifky prasetya" />
        </div>
        <div className="flex lg:hidden h-[400px]"
          style={{
            backgroundImage: `url("https://static.wixstatic.com/media/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png/v1/fill/w_1200,h_440,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/d9f26d_7f681db388ec4354a1d04b91f5683ad3~mv2.png")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="w-full h-full flex flex-col justify-center mt-20 items-end gap-3 text-right sm:pr-[5rem] pr-5">
            <p className="text-4xl font-semibold">Rifky B. Prasetia</p>
            <div className="flex flex-col gap-1 text-xl">
              <p>@rifkyprasetya</p>
              <p>tararifky@live.com</p>
              <p>+62 895-0279-1116</p>
            </div>
          </div>
        </div>
      </Layout>
    </Suspense>
  );
}

export default Contact;
