import React from "react";
import Liveaboards from "./Liveaboards";
import LiveaboardDetails from "./LiveaboardDetails";
import Accommodation from "./Accommodation";
import Facilities from "./Facilities";
import Food from "./Food";
import Scuba from "./Scuba";
import Exclusions from "./Exclusions";
import EnvironmentelPacket from "./EnvironmentelPacket";
// import SwipeBoard from "@/src/components/app/PropertyPage/SwipeBoard";

function PropertyPage() {
  return (
    <>
      <Liveaboards />
      <div>
        <div className="px-4 lg:px-0">
          <LiveaboardDetails />
          <div id="accommodation">
            <Accommodation />
          </div>
        </div>

        {/* <div className="swipeboard">
        <SwipeBoard />
      </div>  */}

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
        </div>
      </div>
    </>
  );
}

export default PropertyPage;
