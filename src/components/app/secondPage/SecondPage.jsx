import React, { useContext } from "react";
import Banner from "./banner/Banner";
import Filtering from "./allFiltering/Filtering";
import FindCard from "./findCard/FindCard";
import { userContext } from "@/src/storage/contextApi";

const SecondPage = () => {
  const { searchValues } = useContext(userContext);
  console.log(searchValues);
  return (
    <div>
      <Banner />
      <Filtering />
      <FindCard />
    </div>
  );
};

export default SecondPage;
