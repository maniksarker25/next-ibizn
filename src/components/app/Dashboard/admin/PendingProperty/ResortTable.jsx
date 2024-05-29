import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState } from "react";
import PropertyModalView from "./PropertyModalView";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const ResortTable = () => {
  const [controlData, setControlData] = useState(false);
  const [resort, setResort] = useState([]);
  console.log(resort);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const [singleData, setSingleData] = useState({});
  const [ratting, setRatings] = useState(null);
  const [foodBasedQuestionAnswer, setFoodBasedQuestionAnswer] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setSingleData({});
  };
  const handleOpen = (data) => {
    setSingleData({ id: data?._id });
    setOpen(true);
  };
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/resorts/pending-resorts`, {
      headers: { Authorization: localStorage.getItem("access-token") },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.length > 0) {
          setResort(data?.data);
          setLoading(false);
        } else {
          setResort([]);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [controlData]);
  // console.log(boats);

  // handel boat approved
  const handleApproved = (id) => {
    fetch(`${baseUrl}/resorts/update-resort/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        status: "approved",
        veganRating: ratting,
        // foodBasedQuestionAnswer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.success) {
          toast.success("Resort approved successfully");
          setControlData(!controlData);
          handleClose();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong , try again later");
      });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="mt-10">
      {resort?.length <= 0 ? (
        <p className="text-xl font-bold text-center">
          {" "}
          There is no pending boats
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-1 border-b"> NAME</th>

                <th className="py-2 px-1 border-b">Status</th>
                <th className="py-2 px-1 border-b">action</th>
              </tr>
            </thead>
            <tbody>
              {resort?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                  }
                >
                  <td className="py-2 px-4 border-b">{item?.propertyName}</td>

                  <td className="py-2 px-4 border-b">
                    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                      {item?.status}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleOpen(item)}
                      className="px-3 py-1 rounded bg-red-400 text-white"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PropertyModalView
        open={open}
        setOpen={setOpen}
        singleData={singleData}
        handleApproved={handleApproved}
        handleClose={handleClose}
        setRatings={setRatings}
        setFoodBasedQuestionAnswer={setFoodBasedQuestionAnswer}
      />
    </div>
  );
};

export default ResortTable;
