import React from "react";

function LiveaboardDetails({ propertyData }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row bg-white  md:mt-16 lg:mt-20 customContainer items-center justify-center px-4 lg:px-0">
      <div className="flex flex-col items-start justify-start gap-4 md:gap-6 lg:gap-8 font-light w-full  text-[#2f2f30]">
        <h1 className="text-3xl mt-20 text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] md:mb-2 font-outfit">
          Ilike Liveaboard
        </h1>
        {propertyData?.liveABoard?.description}
      </div>
      <div className="w-full md:h-auto md:py-16">
        <img
          className="w-full h-[350px] md:h-[500px] object-cover overflow-hidden"
          src={propertyData?.liveABoard?.Picture}
          alt="Ilike Liveaboard"
        />
      </div>
    </div>
  );
}

export default LiveaboardDetails;
