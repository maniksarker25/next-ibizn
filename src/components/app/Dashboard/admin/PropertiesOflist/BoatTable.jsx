import Loader from "@/src/components/core/shared/Loader/Loader";
import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BoatModal from "../PendingProperty/BoatModal";

const BoatTable = () => {
  const [boats, setBoats] = useState([]);
  const [loader, setLoader] = useState(false);
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [singleData, setSingleData] = useState({});

  const handleOpen = (data) => {
    setSingleData({ id: data?._id });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/boats/approved-boats`, {
      headers: { Authorization: localStorage.getItem("access-token") },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.length > 0) {
          // console.log(data);
          setBoats(data?.data);
          setLoading(false);
        } else {
          setBoats([]);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [action]);

  const handleStatusChange = (id) => {
    setAction(false);
    setLoader(true);
    fetch(`${baseUrl}/boats/update-single-boat/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Boat status updated successfully successfully");
          setAction(true);
          setLoader(false);
        } else {
          toast.error(data?.message);
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong , try again later");
        setLoader(false);
      });
  };

  // console.log(boats);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-10">
      {boats?.length <= 0 ? (
        <p className="text-xl font-bold text-center">
          {" "}
          There is no approve boats
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-1 border-b">Property Name</th>
                <th className="py-2 px-1 border-b">Status</th>
                <th className="py-2 px-1 border-b">Action</th>

                {/* <th className="py-2 px-1 border-b">Region</th>
                <th className="py-2 px-1 border-b">Country</th> */}
                {/* <th className="py-2 px-1 border-b">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {boats &&
                boats?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 text-center"
                        : "text-center"
                    }
                  >
                    <td className="py-2 px-4 border-b">
                      {item?.nameOfProperty}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`bg-green-100 ${
                          item?.resitricted ? "text-red-500" : "text-green-800"
                        } text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
                      >
                        {item?.resitricted ? "restricted" : "Active"}
                      </span>
                    </td>
                    {/* <td className="py-2 px-4 border-b">{item?.region}</td>
                  <td className="py-2 px-4 border-b">{item?.country}</td> */}

                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleOpen(item)}
                        className="mr-4 bg-green-500 px-3 py-1 text-white  rounded"
                      >
                        View
                      </button>
                      <button
                        disabled={loader}
                        onClick={() => handleStatusChange(item?._id)}
                        className={`px-3 py-1 rounded ${
                          item?.resitricted ? "bg-green-400" : "bg-red-400"
                        } text-white`}
                      >
                        {item?.resitricted ? "Make Active" : "Make Restricted"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <BoatModal
        open={open}
        setOpen={setOpen}
        singleData={singleData}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BoatTable;
