import React from "react";

function Facilities() {
  const facilityLists = [
    [
      "Life Vests",
      "Life Rafts",
      "Fire alarms",
      "GPS",
      "Satellite & mobile phones",
      "First Aid Kit",
    ],
    [
      "Oxygen Kit",
      "Radio",
      "Shaded dive deck",
      "INT Tanks",
      "DIN Tanks",
      "Rental Equipment",
    ],
  ];
  const facilityLists2 = [
    [
      "Plant-based meals available",
      "Indoor Salon",
      "Outdoor Dining",
      "Audio & Video System",
      "Freshwater maker",
    ],
    [
      "Deck Towels",
      "Cabin towels",
      "Nitrox",
      "Camera Rinse Tanks",
      "Camera/Video Storage",
      "A/C cabins",
    ],
  ];

  const renderList = (list) => (
    <ul className="space-y-2">
      {list.map((item, index) => (
        <li key={index}><span className="opacity-[30%]">—</span> {item}</li>
      ))}
    </ul>
  );

  return (
    <div className="bg-[#0080FF] text-white py-8 px-4 md:py-32 md:px-16">
      <div className="text-start mb-8">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-light">
          Facilities
        </h1>
      </div>
      <div className="flex flex-row lg:flex-row gap-8">
        <div className="flex-1 flex flex-col md:flex-row gap-10">
          {facilityLists.map((list, index) => (
            <div key={index} className="flex-1   rounded-lg">
              {renderList(list)}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-10">
          {facilityLists2.map((list, index) => (
            <div key={index} className="flex-1  rounded-lg">
              {renderList(list)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facilities;
