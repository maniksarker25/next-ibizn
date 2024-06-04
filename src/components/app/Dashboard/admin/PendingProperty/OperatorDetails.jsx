import { baseUrl } from "@/src/config/serverConfig";
import React, { useState } from "react";

const OperatorDetails = ({ userInfo }) => {
  const [bankInformation, setBankInformation] = useState(null);
  const showBankInfo = () => {
    console.log("show bank info");
    fetch(`${baseUrl}/bank-information/${userInfo?._id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setBankInformation(data?.data));
  };
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold ">Operator Details</h2>
      <div>
        <p className="text-lg my-2">
          <span className="font-semibold">Name:</span> {userInfo?.fullName}
        </p>
        <p className="text-lg my-2">
          <span className="font-semibold">Email:</span> {userInfo?.email}
        </p>
        <p className="text-lg my-2">
          <span className="font-semibold">Phone:</span> {userInfo?.phone}
        </p>
        <p className="text-lg my-2">
          <span className="font-semibold">Status:</span> {userInfo?.status}
        </p>
      </div>
      {!bankInformation && (
        <button
          onClick={showBankInfo}
          className="bg-green-500 px-4 py-2 rounded text-white my-4"
        >
          See Bank Information
        </button>
      )}
      {bankInformation && (
        <div>
          <h2 className="text-xl font-semibold my-4">Bank Information</h2>
          <div>
            <h2 className="text-lg font-semibold">Local Bank Info</h2>
            <p className="text-lg my-2">
              <span className="font-semibold">Bank Name:</span>{" "}
              {bankInformation?.localBank?.bankName}
            </p>
            <p className="text-lg my-2">
              <span className="font-semibold">Account Holder Name:</span>{" "}
              {bankInformation?.localBank?.accountHolderName}
            </p>
            <p className="text-lg my-2">
              <span className="font-semibold">Account Number:</span>{" "}
              {bankInformation?.localBank?.accountNumber}
            </p>
            <p className="text-lg my-2">
              <span className="font-semibold">Routing Number:</span>{" "}
              {bankInformation?.localBank?.routingNumber}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Wise Bank Info</h2>
            <p className="text-lg my-2">
              <span className="font-semibold">Email:</span>{" "}
              {bankInformation?.wiseBank?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorDetails;
