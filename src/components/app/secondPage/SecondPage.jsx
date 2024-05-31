import React, { useContext, useEffect } from "react";
import Banner from "./banner/Banner";
import Filtering from "./allFiltering/Filtering";
import FindCard from "./findCard/FindCard";
import { userContext } from "@/src/storage/contextApi";
import { baseUrl } from "@/src/config/serverConfig";

const SecondPage = () => {
  const { searchValues } = useContext(userContext);
  // console.log(searchValues);
  // useEffect(() => {
  //   const objectToQueryString = (obj) => {
  //     const queryString = Object.keys(obj)
  //       .map(
  //         (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  //       )
  //       .join("&");
  //     return queryString;
  //   };

  //   // Construct the query string from searchValues
  //   const queryString = objectToQueryString(searchValues);

  //   fetch(
  //     `${baseUrl}/${
  //       searchValues?.tabValue === "Resorts" ||
  //       searchValues?.property === "resort"
  //         ? "resorts/all-resorts"
  //         : "boats/all-boats"
  //     }?${queryString}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [searchValues]);
  return (
    <div>
      <Banner />
      <Filtering />
      <FindCard />
    </div>
  );
};

export default SecondPage;
