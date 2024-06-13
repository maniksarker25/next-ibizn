import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const OrderedSchedule = ({ scheduleId, schedules }) => {
  const schedule = schedules?.find((s) => s._id === scheduleId);
  return (
    <div>
      <h1 className="text-3xl font-semibold  my-3">
        Ordered Trip
        <ArrowDownwardIcon />{" "}
      </h1>
      <div>
        <div className="md:flex justify-between mb-5">
          <div className="text-xl  ">
            <h1>Region : {schedule?.itinerary?.region}</h1>
          </div>
          <div className="text-xl  ">
            <h1>Country : {schedule?.itinerary?.country}</h1>
          </div>
          <div className="text-xl ">
            <h1>District : {schedule?.itinerary?.district}</h1>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xl ">
            <h1>
              Trip Start Date :{" "}
              {new Date(schedule?.tripStart).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="text-xl ">
            <h1>
              Trip End Date :{" "}
              {new Date(schedule?.tripEnd).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="text-xl ">
            <h1>
              Embarkation Point : {schedule?.itinerary?.embarkationPoints}
            </h1>
          </div>
          <div className="text-xl ">
            <h1>
              Disembarkation Point : {schedule?.itinerary?.disembarkationPoints}
            </h1>
          </div>
          <h1 className="text-xl ">
            {" "}
            Number of nights : {schedule?.itinerary?.numberOfNights}
          </h1>
          <h1 className="text-xl ">
            Number of days : {schedule?.itinerary?.numberOfDays}
          </h1>
          <h1 className="text-xl ">
            Number of nights : {schedule?.itinerary?.numberOfNights}
          </h1>
          <h1 className="text-xl ">
            Number of dives : {schedule?.itinerary?.numberOfDives}
          </h1>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mt-4">Cabins:</h1>
          {schedule?.itinerary?.cabins?.map((cabin, index) => (
            <div
              key={index}
              className="md:flex justify-between items-center space-y-4"
            >
              <p className="text-xl ">Name:{cabin?.cabinName}</p>
              <p className="text-xl">Price:{cabin?.cabinPrice}</p>
              <img className="w-20 h-20 rounded-md" src={cabin?.cabinPicture} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderedSchedule;
