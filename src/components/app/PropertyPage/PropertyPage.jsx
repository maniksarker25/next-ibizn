import React, { useEffect, useState } from "react";
import Liveaboards from "./Liveaboards";
import LiveaboardDetails from "./LiveaboardDetails";
import Accommodation from "./Accommodation";
import Facilities from "./Facilities";
import Food from "./Food";
import Scuba from "./Scuba";
import Exclusions from "./Exclusions";
import EnvironmentelPacket from "./EnvironmentelPacket";
import SwipeBoard from "./SwipeBoard";
import { baseUrl } from "@/src/config/serverConfig";
import Itineraries from "../Dashboard/Boat/Itineraries";
import ItinerariesAndPrices from "./Itinerary/ItinerariesAndPrices";
// import SwipeBoard from "@/src/components/app/PropertyPage/SwipeBoard";

function PropertyPage({ id }) {
  const [propertyData, setPropertyData] = useState({});
  // console.log(propertyData);
  useEffect(() => {
    fetch(`${baseUrl}/boats/single-boat/6661a8c60a5a86bd20f3fd83`)
      .then((res) => res.json())
      .then((data) => setPropertyData(data.data));
  }, []);
  return (
    <>
      <Liveaboards />
      <div>
        <div className="">
          <LiveaboardDetails />
          <div className="swipeboard">
            <SwipeBoard />
          </div>
          <div id="accommodation">
            <Accommodation />
          </div>
        </div>

        <div id="facilities">
          <Facilities />
        </div>

        <div className="">
          <div className="px-4 lg:px-0" id="food">
            <Food />
          </div>
          <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0" id="scuba">
            <Scuba />
          </div>
          <div className="py-6" id="exclusions">
            <Exclusions />
          </div>
          <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0">
            <EnvironmentelPacket />
          </div>
          <div id="itinerariesandprices">
            <ItinerariesAndPrices propertyData={propertyData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyPage;
