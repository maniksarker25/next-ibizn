import Spinner from "@/src/components/core/shared/Loader/Spinner";
import { baseUrl } from "@/src/config/serverConfig";
import { Questions } from "@/src/constant/questions/questions";
import { userContext } from "@/src/storage/contextApi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import OperatorDetails from "./OperatorDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};
// console.log({ Questions });
const PropertyModalView = ({
  open,
  setOpen,
  singleData,
  handleApproved,
  handleClose,
  setRatings,
  setFoodBasedQuestionAnswer,
  ratingError,
}) => {
  const [resortData, setResortData] = useState({});

  const { loader, setLoader } = useContext(userContext);
  const [error, setError] = useState("");
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
    fetch(`${baseUrl}/resorts/single-resort/${singleData?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setResortData(data?.data);
        setLoader(false);
      });
  }, [singleData]);

  // const showBankInfo = () => {
  //   console.log("show bank info");
  //   fetch(`${baseUrl}/bank-information/${resortData?.user?._id}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: localStorage.getItem("access-token"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBankInformation(data?.data));
  // };

  return (
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
            <h2 className="text-2xl font-semibold ">
              {/* {singleData?.nameOfProperty
              ? singleData.nameOfProperty
              : singleData?.propertyName} */}
              {resortData?.propertyName}
            </h2>
            <img
              className="w-full h-[300px] rounded my-3 object-contain"
              // src={featuredImage}
              src={resortData?.briefImage}
              alt="featured image"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5  my-5">
              <div className="flex gap-2 ">
                <h2 className="capitalize font-semibold">region:</h2>{" "}
                <h3>{resortData?.region}</h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">country:</h2>{" "}
                <h3>{resortData?.region}</h3>
              </div>
              <div className="flex gap-2">
                <h2 className="capitalize font-semibold">district:</h2>{" "}
                <h3>{resortData?.region}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 justify-items-start  gap-5">
              <div>
                <h2 className="font-semibold">Facilities </h2>
                <ul>
                  {resortData?.facilities?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold capitalize">inclusions</h2>
                <ul>
                  {resortData?.inclusions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold capitalize">exclusions</h2>
                <ul>
                  {resortData?.exclusions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold capitalize">equipments</h2>
                <ul>
                  {resortData?.equipment?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold capitalize">diveCourses</h2>
                <ul>
                  {resortData?.diveCourses?.map((item, index) => (
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
                    {resortData?.environmentalQuestions?.hasOwnProperty(
                      item?.id
                    ) && (
                      <div className="my-4">
                        <h2>
                          <strong className="mr-2">question:</strong>{" "}
                          {item?.question}
                        </h2>
                        <p className="">
                          <strong className="mr-2">Answer: </strong>{" "}
                          {resortData?.environmentalQuestions &&
                            resortData?.environmentalQuestions[item?.id]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <div className="my-8">
              <h2 className="text-2xl font-semibold ">Operator Details</h2>
              <div>
                <p className="text-lg my-2">
                  <span className="font-semibold">Name:</span>{" "}
                  {resortData?.user?.fullName}
                </p>
                <p className="text-lg my-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {resortData?.user?.email}
                </p>
                <p className="text-lg my-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {resortData?.user?.phone}
                </p>
                <p className="text-lg my-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {resortData?.user?.status}
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
                  <h2 className="text-xl font-semibold my-4">
                    Bank Information
                  </h2>
                  <div>
                    <h2 className="text-lg font-semibold">Local Bank Info</h2>
                    <p className="text-lg my-2">
                      <span className="font-semibold">Bank Name:</span>{" "}
                      {bankInformation?.localBank?.bankName}
                    </p>
                    <p className="text-lg my-2">
                      <span className="font-semibold">
                        Account Holder Name:
                      </span>{" "}
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
            </div> */}
            <OperatorDetails userInfo={resortData?.user} />
            {resortData?.status === "pending" && (
              <div>
                {" "}
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
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleApproved(resortData?._id)}
                    className="text-white bg-green-500 rounded px-4 py-2"
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
  );
};

export default PropertyModalView;
