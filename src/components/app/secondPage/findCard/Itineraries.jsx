import React from "react";

const Itineraries = ({ schedules }) => {
  return (
    <div>
      {schedules?.map((item, index) => (
        <div
          key={index}
          className={`flex flex-wrap justify-between py-6 px-3 md:px-5 ${
            index % 2 === 0 ? "bg-slate-100" : ""
          }`}
        >
          <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit">
            {new Date(item?.tripStart).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            -{" "}
            {new Date(item?.tripEnd).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </h1>
          <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit border-l-2 pl-5">
            {item?.itinerary?.numberOfDays + " "}days,{" "}
            {item?.itinerary?.numberOfNights + " "}nights
          </h1>
          <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit border-l-2 pl-5">
            approx. 18 divers
          </h1>
          <h1 className="text-[#0080ff] text-[14px] md:text-[18px] lg:text-subtitle font-outfit border-l-2 pl-5">
            from usd{" "}
            <span className="text-[#0080ff] ms-2 text-xl md:text-[32px] font-outfit">
              {item?.cost}
            </span>
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Itineraries;
