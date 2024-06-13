import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../../core/shared/Loader/Loader";

const OperatorsOfList = () => {
  const [operators, setOperators] = useState([]);
  const { control, setControl, loader, setLoader } = useContext(userContext);

  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/users/get-operators`, {
      headers: { Authorization: localStorage.getItem("access-token") },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data?.data?.length > 0) {
          setOperators(data?.data);
          setLoader(false);
        }
      })
      .catch((err) => setLoader(false));
  }, [control]);

  // restrict user-----------------
  const restrictUser = (id) => {
    fetch(`${baseUrl}/users/restrict-user/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("User restricted successfully");
          setControl(!control);
        } else {
          // show error message when data is not connect
          toast.error(data?.message);
        }
      })
      .catch((err) => toast.error("Something went wrong,try again later"));
  };
  // unRestrict user
  const unRestrictUser = (id) => {
    fetch(`${baseUrl}/users/unRestrict-user/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("User activated successfully");
          setControl(!control);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => toast.error("Something went wrong,try again later"));
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-1 border-b">Name</th>
            <th className="py-2 px-1 border-b">Email</th>
            <th className="py-2 px-1 border-b">Phone</th>
            {/* <th className="py-2 px-1 border-b">Company Name</th> */}
            <th className="py-2 px-1 border-b">Status</th>
            <th className="py-2 px-1 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {operators?.map((item, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
              }
            >
              <td className="py-2 px-4 border-b">{item?.fullName}</td>
              <td className="py-2 px-4 border-b">{item?.email}</td>
              <td className="py-2 px-4 border-b">{item?.phone}</td>
              {/* <td className="py-2 px-4 border-b">{item?.companyName}</td> */}
              <td className="py-2 px-4 border-b">
                <span
                  className={`bg-green-100 ${
                    item?.status === "active"
                      ? "text-green-800"
                      : "text-red-700"
                  } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                >
                  {item?.status}
                </span>
              </td>

              <td className="py-2 px-4 border-b">
                {item?.status === "active" ? (
                  <button
                    onClick={() => restrictUser(item?._id)}
                    className="px-3 py-1 rounded bg-red-400 text-white"
                  >
                    Make Restricted
                  </button>
                ) : (
                  <button
                    onClick={() => unRestrictUser(item?._id)}
                    className="px-3 py-1 rounded bg-green-400 text-white"
                  >
                    Make Active
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatorsOfList;
