import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import SpecialOffer from "../specialOffer/SpecialOffer";
import BestBoard from "./../bestOfThisMounthBoard/Bestboard";
import WhyDeeparture from "./../whyDeeparture/WhyDeeparture";

const Home = () => {
  const [isPropertyShow, setIsPropertyShow] = useState(false);

  return (
    <div className="space-y-20">
      <Banner />
      <SpecialOffer />
      <BestBoard />
      <WhyDeeparture />
    </div>
  );
};

export default Home;
