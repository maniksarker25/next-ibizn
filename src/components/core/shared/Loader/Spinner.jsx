import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <HashLoader size={100} color="#36d7b7" />
    </div>
  );
};

export default Spinner;
