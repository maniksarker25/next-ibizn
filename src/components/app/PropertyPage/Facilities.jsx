import React from "react";

function Facilities() {
  const facilityList1 = [
    "Life Vests",
    "Life Rafts",
    "Fire alarms",
    "GPS",
    "Satellite & mobile phones",
    "First Aid Kit"
  ];

  const facilityList2 = [
    "Oxygen Kit",
    "Radio",
    "Shaded dive deck",
    "INT Tanks",
    "DIN Tanks",
    "Rental Equipment"
  ];

  const facilityList3 = [
    "Plant-based meals available",
    "Indoor Salon",
    "Outdoor Dining",
    "Audio & Video System",
    "Freshwater maker"
  ];

  const facilityList4 = [
    "Deck Towels",
    "Cabin towels",
    "Nitrox",
    "Camera Rinse Tanks",
    "Camera/Video Storage",
    "A/C cabins"
  ];

  const renderList = (list) => (
    <ul className="text-white font-[400] text-3xl flex items-start justify-center flex-col gap-2">
      {list.map((item, index) => (
        <li key={index}>— {item}</li>
      ))}
    </ul>
  );

  return (
    <div className="w-full h-[80vh] bg-[#0080FF] px-28 flex items-center justify-between">
      <div className="flex items-center justify-between w-1/2 h-3/4">
        <div className="w-1/2 h-full flex items-start justify-center flex-col gap-10">
          <h1 className="text-7xl font-[400] text-white">Facilities</h1>
          <div className="text-white font-[400] text-3xl flex items-start justify-center flex-col gap-2">
            {renderList(facilityList1)}
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="text-white font-[400] text-3xl flex items-start justify-center mt-16 flex-col gap-2">
            {renderList(facilityList2)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-1/2 h-3/4">
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="text-white font-[400] text-3xl flex items-start justify-center mt-16 flex-col gap-2">
            {renderList(facilityList3)}
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="text-white font-[400] text-3xl flex items-start justify-center mt-16 flex-col gap-2">
            {renderList(facilityList4)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facilities;
