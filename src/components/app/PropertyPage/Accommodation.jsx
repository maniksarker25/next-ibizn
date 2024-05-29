import React, { useState } from "react";

const Accommodation = () => {
  const [activeButton, setActiveButton] = useState("Regular room");

  const accommodationTypes = {
    "Regular room": {
      description:
        "The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in 8 cabins. All cabins have individually controlled air conditioning, en-suite bathrooms, and hot and cold showers. In addition, the thoughtfully designed rooms can be laid out as twins or doubles, so can easily provide for your requirements. The yacht offers a large, comfortable outside deck to chill out after an incredible day’s diving.",
      imgSrc:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    "Delux room": {
      description:
        "Experience luxury in our Delux room, featuring modern amenities and a spacious layout, perfect for relaxing after a day's adventure.",
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1661962739798-0af59dc30d14?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    "Super Delux room": {
      description:
        "Indulge in our Super Delux room, offering top-tier comfort and elegance with premium features to make your stay unforgettable.",
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682433066496-2daf69be82f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  const { description, imgSrc } = accommodationTypes[activeButton];

  const Button = ({ label }) => (
    <button
      className={`px-6 py-4 inline rounded-full text-2xl border-[#0080FF] text-[#0080FF] font-medium border-[1px] ${
        activeButton === label
          ? "bg-[#0080FF] text-white"
          : "hover:bg-[#0080FF] hover:text-white"
      }`}
      onClick={() => setActiveButton(label)}
    >
      {label}
    </button>
  );

  return (
    <section className="w-full py-16 h-[80vh] px-28 flex items-center justify-between gap-10">
      <div className="w-1/2 h-full">
        <img
          className="w-full h-full object-cover"
          src={imgSrc}
          alt={activeButton}
        />
      </div>
      <div className="w-1/2 h-full flex items-start justify-between flex-col">
        <div className="flex flex-col gap-10">
          <h1 className="text-7xl font-seni-bold text-[#0080FF]">
            Accommodation
          </h1>
          <p className="w-[90%] text-3xl font-light">{description}</p>
        </div>
        <div className="flex items-center justify-center gap-10">
          {Object.keys(accommodationTypes).map((button) => (
            <Button key={button} label={button} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodation;
