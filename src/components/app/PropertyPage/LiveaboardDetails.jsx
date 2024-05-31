import React from 'react';

function LiveaboardDetails() {
  return (
    <div className="flex flex-col lg:flex-row bg-white mt-20 w-[90%] mx-auto items-center justify-center">
      <div className="flex flex-col items-start justify-start gap-4 md:gap-6 lg:gap-8 font-light w-full  text-black">
        <h1 className="text-3xl mt-20 text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] md:mb-5">Ilike Liveaboard</h1>
        <p className="text-[16px] md:text-xl md:font-light md:text-black md:leading-9">
          Best Mid-Range Liveaboard in Indonesia. For the level of service,
          attention to detail, diving experience, and drive to be inclusive,
          all at a mid-range price, the MSY Ilike gets our vote for one of
          Indonesia’s best mid-range priced dive liveaboards.
        </p>
        <p className="text-[16px] md:text-xl md:font-light md:text-black md:leading-9 pt-4">
          Constructed in Bira, Sulawesi, in 2010, the MSY Ilike is a
          traditional style of Indonesian Phinisi. She is a spacious,
          comfortable dive liveaboard that cruises Indonesia’s best scuba
          locations. Boasting two marine engines for speed and safety, she
          heads to Raja Ampat, Komodo, the Banda Sea, and Alor. The yacht
          maintains all the necessary equipment to ensure your well-being
          onboard.
        </p>
      </div>
      <div className="w-full md:h-auto md:py-16">
        <img 
          className="w-full h-[350px] md:h-[500px] object-cover rounded-xl overflow-hidden" 
          src="https://images.unsplash.com/photo-1517217004452-4ff260cb5598?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Ilike Liveaboard" 
        />
      </div>
    </div>
  );
}

export default LiveaboardDetails;
