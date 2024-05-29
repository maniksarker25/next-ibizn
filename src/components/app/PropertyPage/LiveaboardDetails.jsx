import React from 'react';

function LiveaboardDetails() {
  return (
    <div className="w-full h-[90vh] bg-white flex items-center justify-center">
      <div className="w-1/2 h-full pl-28 pr-7 text-black flex flex-col items-start justify-start gap-5 py-28 font-light">
        <h1 className="text-7xl font-seni-bold text-[#0080FF]">Ilike Liveaboard</h1>
        <p className="w-[90%] text-3xl">
          Best Mid-Range Liveaboard in Indonesia. For the level of service,
          attention to detail, diving experience, and drive to be inclusive,
          all at a mid-range price, the MSY Ilike gets our vote for one of
          Indonesia’s best mid-range priced dive liveaboards.
        </p>
        <p className="w-[90%] text-3xl">
          Constructed in Bira, Sulawesi, in 2010, the MSY Ilike is a
          traditional style of Indonesian Phinisi. She is a spacious,
          comfortable dive liveaboard that cruises Indonesia’s best scuba
          locations. Boasting two marine engines for speed and safety, she
          heads to Raja Ampat, Komodo, the Banda Sea, and Alor. The yacht
          maintains all the necessary equipment to ensure your well-being
          onboard.
        </p>
      </div>
      <div className="w-1/2 h-3/4">
        <img 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1517217004452-4ff260cb5598?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Ilike Liveaboard" 
        />
      </div>
    </div>
  );
}

export default LiveaboardDetails;
