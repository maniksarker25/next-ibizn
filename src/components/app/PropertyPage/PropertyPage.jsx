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
  useEffect(() => {
    fetch(`${baseUrl}/boats/single-boat/6607eeb58a3751bc5d5ff2d0`)
      .then((res) => res.json())
      .then((data) => setPropertyData(data.data));
  }, []);
  return (
    <>
      <Liveaboards />
      <div>
        <div className="px-4 lg:px-0">
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

        <div className="px-4 lg:px-0">
          <div id="food">
            <Food />
          </div>
          <div id="scuba">
            <Scuba />
          </div>
          <div id="exclusions">
            <Exclusions />
          </div>
          <EnvironmentelPacket />
          <div id="itinerariesandprices">
            <ItinerariesAndPrices propertyData={propertyData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyPage;
