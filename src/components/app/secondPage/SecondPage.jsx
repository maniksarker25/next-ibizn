import React, { useContext, useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Filtering from "./allFiltering/Filtering";
import FindCard from "./findCard/FindCard";
import { userContext } from "@/src/storage/contextApi";
import { baseUrl } from "@/src/config/serverConfig";

const SecondPage = () => {
  const { searchValues } = useContext(userContext);
  console.log(searchValues);
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchResult);
  useEffect(() => {
    const objectToQueryString = (obj) => {
      const queryString = Object.keys(obj)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&");
      return queryString;
    };

    // Construct the query string from searchValues
    const queryString = objectToQueryString(searchValues);

    fetch(
      `${baseUrl}/${
        searchValues?.tabValue === "Resorts" ||
        searchValues?.property === "resort"
          ? "resorts/all-resorts"
          : "boats/all-boats"
      }?${queryString}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResult(data?.data));
  }, [searchValues]);
  return (
    <div>
      <Banner setSearchResult={setSearchResult} />
      <Filtering />
      <FindCard />
    </div>
  );
};

export default SecondPage;
