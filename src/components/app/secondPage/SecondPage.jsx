import React from "react";
import Banner from "./banner/Banner"
import Filtering from './allFiltering/Filtering';
import FindCard from './findCard/FindCard';

const SecondPage = () => {
  return (
    <div>
        <Banner/>
        <Filtering/>
        <FindCard/>
    </div>
  );
};

export default SecondPage;
