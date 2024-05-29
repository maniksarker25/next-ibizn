import { whyDeeptures } from "@/src/constant/whyDeeptures";
import React from "react";

const WhyDeeparture = () => {
  return (
    <div className="bg-primary py-16">
      <div className="px-5 xl:px-0 customContainer">
        <div>
          <h1 className="lg:text-title md:leading-[62px] md:text-5xl text-4xl font-light font-outfit 
          text-[#f1f2f2] mb-2">
            Why Deeparture
          </h1>
          <p className="text-[#f1f2f2] font-light  text-[18px] md:text-[24px] leading-[26px] md:w-full lg:w-3/4 w-full">
            We are a team of professional scuba divers, free divers, artists and
            environmental advocates who work tirelessly to provide you with incredible,
            inclusive dive experiences, from experience, that you deserve. Explore
            adventures and book easily online for your next dive deeparture.
          </p>
        </div>
        <div className="mt-[45px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-12">
          {
            whyDeeptures.map((item, index) =>
              <div key={index} className="text-white space-y-3">
                <img src={item.icon} className="size-14" alt="" />
                <h1 className="md:text-2xl md:leading-[24px] text-xl text-[#f1f2f2] font-outfit font-semibold">
                  {item.title}
                </h1>
                <p className="text-[#f1f2f2] text-[16px] md:text-[18px] md:leading-[22px] font-light">
                  {item.desc}
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default WhyDeeparture;
