import { createContext, useEffect, useState } from "react";
import { decodeJWT } from "../config/tokenDecoded";
import { baseUrl } from "@/src/config/serverConfig";
export const userContext = createContext();

const ContextApi = ({ children }) => {
  const [user, setUser] = useState({});
  const [control, setControl] = useState(false);
  const [country, setCountry] = useState([]);
  const [loader, setLoader] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [searchValues, setSearchValues] = useState({
    tabValue: "Liveaboards",
    destination: "",
    // property: "",
    date: "",
    minRating: "",
    maxRating: "",
  });
  console.log(searchValues);
  useEffect(() => {
    fetch("/country.json")
      .then((res) => res.json())
      .then((data) => setCountry(data))
      .catch((err) => console.error(err));
  }, []);

  // console.log({ user });
  useEffect(() => {
    const jwt = localStorage.getItem("access-token");
    const parserJwt = jwt && decodeJWT(jwt);
    setLoader(true);
    // console.log(parserJwt?.payload);

    fetch(`${baseUrl}/users/get-single-user/${parserJwt?.payload?.userId}`, {
      headers: { Authorization: `${jwt}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [control]);

  const value = {
    user,
    setUser,
    control,
    setControl,
    country,
    loader,
    setLoader,
    submitLoader,
    setSubmitLoader,
    searchValues,
    setSearchValues,
  };
  // console.log({ country });
  return (
    <>
      <userContext.Provider value={value}>{children}</userContext.Provider>
    </>
  );
};

export default ContextApi;
