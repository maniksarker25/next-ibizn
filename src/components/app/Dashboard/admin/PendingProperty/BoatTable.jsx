import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/src/components/core/shared/Loader/Loader";
import BoatModal from "./BoatModal";

const BoatTable = () => {
  const [controlData, setControlData] = useState(false);
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingError, setRatingError] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [singleData, setSingleData] = useState({});
  const [ratting, setRatings] = useState(null);
  const [foodBasedQuestionAnswer, setFoodBasedQuestionAnswer] = useState(null);

  const handleOpen = (data) => {
    setSingleData({ id: data?._id });
    setOpen(true);
  };
  console.log(ratting);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/boats/pending-boats`, {
      headers: { Authorization: localStorage.getItem("access-token") },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.length > 0) {
          setBoats(data?.data);
          setLoading(false);
        } else {
          setBoats([]);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [controlData]);
  // console.log(boats);

  // handel boat approved
  const handleApproved = (id) => {
    if (ratting === null) {
      setRatingError("Please add vegan rating");
      return;
    }
    fetch(`${baseUrl}/boats/update-boat/${id}`, {
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
          toast.success("Boat approved successfully");
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
    return <Loader />;
  }

  return (
    <div className="mt-10">
      {boats?.length <= 0 ? (
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
              {boats?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                  }
                >
                  <td className="py-2 px-4 border-b">{item?.nameOfProperty}</td>

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
      <BoatModal
        open={open}
        setOpen={setOpen}
        singleData={singleData}
        handleApproved={handleApproved}
        handleClose={handleClose}
        setRatings={setRatings}
        setFoodBasedQuestionAnswer={setFoodBasedQuestionAnswer}
        ratingError={ratingError}
      />
    </div>
  );
};

export default BoatTable;
