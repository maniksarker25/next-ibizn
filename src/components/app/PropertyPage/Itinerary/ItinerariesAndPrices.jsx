import { useState } from "react";
import CabinModal from "./CabinModal";
import BookingModal from "./BookingModal";

function ItinerariesAndPrices({ propertyData }) {
  const [cabins, setCabins] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = (cabins) => {
    setOpen(true);
    setCabins(cabins);
  };
  // for booking model;
  const [schedule, setSchedule] = useState({});
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleOpenBookingModal = (schedule) => {
    setSchedule(schedule);
    setIsOpenBookingModal(true);
  };

  if (!propertyData || !propertyData.schedules) {
    return <div>No itinerary data available</div>;
  }

  return (
    <div className="w-full bg-primary">
      <div className="customContainer mx-auto py-8 px-4">
        <h1 className="text-2xl text-white font-light md:text-6xl md:font-light my-8">
          Itineraries and Prices
        </h1>

        {propertyData?.schedules?.length > 0 ? (
          propertyData?.schedules?.map((schedule, index) => (
            <div
              key={index}
              className="border-2 flex flex-col xl:flex-row gap-4 border-[#09aafe] text-white p-8 mb-4 rounded-lg md:justify-between items-start"
            >
              <div className="w-full">
                <div className="md:text-white md:text-4xl items-end font-[400] flex flex-wrap gap-2 md:gap-8">
                  <div className="inline-block text-xl md:text-xl lg:text-4xl">
                    {new Date(schedule?.tripStart).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    —{" "}
                    {new Date(schedule?.tripEnd).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="inline-block text-2xl font-light">
                    ({schedule?.itinerary?.numberOfDays} Days /{" "}
                    {schedule?.itinerary?.numberOfNights} Nights)
                  </div>
                  <span className="inline-block text-[#09aafe] text-xl font-bold">
                    (from {schedule.cost} USD)
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-2xl md:text-5xl md:font-light">
                    {schedule?.itinerary?.embarkationPoints} —{" "}
                    {schedule?.itinerary?.disembarkationPoints}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => handleOpen(schedule?.itinerary?.cabins)}
                  className="bg-primary border-2 border-white text-white md:px-16 rounded-full px-6 py-2 text-sm md:text-xl lg:text-2xl"
                >
                  Itinerary
                </button>
                <button
                  onClick={() => handleOpenBookingModal(schedule)}
                  className="bg-white text-primary rounded-full px-6 py-2 md:px-16 text-sm md:text-xl lg:text-2xl"
                >
                  Select
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No itineraries available.</p>
        )}
      </div>
      <CabinModal cabins={cabins} setOpen={setOpen} open={open} />
      <BookingModal
        open={isOpenBookingModal}
        setOpen={setIsOpenBookingModal}
        propertyData={propertyData}
        schedule={schedule}
      />
    </div>
  );
}

export default ItinerariesAndPrices;
