import React from "react";

const Region = ({ scheduleId, schedules }) => {
  const schedule = schedules?.find((s) => s._id === scheduleId);
  return <div>{schedule?.itinerary?.region}</div>;
};

export default Region;
