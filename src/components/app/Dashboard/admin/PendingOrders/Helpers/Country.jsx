import React from "react";

const Country = ({ scheduleId, schedules }) => {
  const schedule = schedules?.find((s) => s._id === scheduleId);
  return <div>{schedule?.itinerary?.country}</div>;
};

export default Country;
