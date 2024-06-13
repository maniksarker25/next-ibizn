import Spinner from "@/src/components/core/shared/Loader/Spinner";
import { baseUrl } from "@/src/config/serverConfig";
import { Questions } from "@/src/constant/questions/questions";
import { userContext } from "@/src/storage/contextApi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import OperatorDetails from "./OperatorDetails";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import LaunchIcon from "@mui/icons-material/Launch";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const BoatModal = ({
  open,
  setOpen,
  singleData,
  handleApproved,
  handleClose,
  setRatings,
  setFoodBasedQuestionAnswer,
  ratingError,
}) => {
  const [boatData, setBoatData] = useState({});
  const { loader, setLoader } = useContext(userContext);
  const [error, setError] = useState("");
  const router = useRouter();
  const rattingNumberHandler = (e) => {
    const number = Number(e.target.value);
    console.log(number);
    if (number < 1) {
      setError("please add ratting number only 1-5");
    } else if (number > 5) {
      setError("ratting number is bigger than 5 please add only 1-5");
    } else {
      setError("");
      setRatings(number);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/boats/single-boat/${singleData?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBoatData(data?.data);
        setLoader(false);
      });
  }, [singleData]);
  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loader ? (
            <Spinner />
          ) : (
            <div>
              <h2
                onClick={() =>
                  window.open(`/secondPage/${boatData?._id}`, "_blank")
                }
                className="text-2xl font-semibold  underline cursor-pointer"
              >
                {boatData?.nameOfProperty}
                <LaunchIcon sx={{ ml: "10px" }} />
              </h2>
              <img
                className="w-full h-[300px] rounded my-3 object-contain"
                src={boatData?.featuredImage}
                alt="featured image"
              />
              {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-5  my-5">
              <div className="flex gap-2 ">
                <h2 className="capitalize font-semibold">region:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">country:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">district:</h2> <h3>
                  {boatData?.region}
                </h3>
              </div>
            </div> */}
              <div className="grid grid-cols-2 md:grid-cols-3 justify-items-start  gap-5">
                <div>
                  <h2 className="font-semibold">Facilities </h2>
                  <ul>
                    {boatData?.facilities?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold capitalize">inclusions</h2>
                  <ul>
                    {boatData?.inclusions?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold capitalize">exclusions</h2>
                  <ul>
                    {boatData?.exclusions?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold capitalize">equipments</h2>
                  <ul>
                    {boatData?.equipment?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-semibold capitalize">diveCourses</h2>
                  <ul>
                    {boatData?.diveCourses?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="my-5">
                <h2 className="text-2xl mt-10 underline">
                  Environment Questions
                </h2>
                {Questions.map((item, index) => {
                  return (
                    <div key={index}>
                      {boatData?.environmentalQuestions?.hasOwnProperty(
                        item?.id
                      ) && (
                        <div className="my-4">
                          <h2>
                            <strong className="mr-2">question:</strong>{" "}
                            {item?.question}
                          </h2>
                          <p className="">
                            <strong className="mr-2">Answer: </strong>{" "}
                            {boatData?.environmentalQuestions &&
                              boatData?.environmentalQuestions[item?.id]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <OperatorDetails userInfo={boatData?.user} />
              {boatData?.status === "pending" && (
                <div>
                  <div>
                    {/* <p>Food Based Question Answer</p>
                <textarea
                  name="foodBasedQuestionAnswer"
                  type="text"
                  onChange={(e) => setFoodBasedQuestionAnswer(e.target.value)}
                  className="w-full"
                /> */}
                    <div className="space-y-2">
                      <p className="font-medium">Add veganRating</p>

                      <input
                        onChange={(e) => rattingNumberHandler(e)}
                        type="number"
                        className="focus:border-none active:border-none py-2 w-[300px]"
                        min={1}
                        max={5}
                      />
                      {error && <p className="text-red-600 block">{error}</p>}
                      {ratingError && (
                        <p className="text-red-600 block">{ratingError}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => handleApproved(boatData?._id)}
                      className="text-white bg-green-500 rounded px-4 py-2"
                      disabled={error}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BoatModal;
