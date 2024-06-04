import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import Accommodation from "./BoardForm/Accommodation";
import CheckFeilds from "./BoardForm/CheckFeilds";
import Diving from "./BoardForm/Diving";
import FoodOnBoard from "./BoardForm/FoodOnBoard";
import BasicInfo from "./BoardForm/Form";
import LiveaBoard from "./BoardForm/LiveaBoard";
import { compressAndConvertToBase64 } from "@/src/config/base64";
import BoardTable from "./BoardForm/Table";
import { baseUrl } from "@/src/config/serverConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import EnvQAndA from "./BoardForm/EnvQAndA";
import { useContext } from "react";
import { userContext } from "@/src/storage/contextApi";
const AddBoat = () => {
  const rotuer = useRouter();
  const { submitLoader, setSubmitLoader } = useContext(userContext);
  const [progress, setProgress] = React.useState(8);
  const [caruselImages, setCaruselImages] = useState([]);
  const [boardData, setBoardData] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedBoatDive, setSelectedBoatDive] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [cabinsData, setCabinsData] = useState([]);
  const totalSteps = 8;
  const [itineraryData, setItineraryData] = useState([]);
  // const [fileError, setFileError] = useState('');
  console.log("current step =======================>", currentStep);

  const increaseProgress = () => {
    setProgress((oldProgress) => Math.min(oldProgress + 12.5, 100));
  };

  const decreaseProgress = () => {
    setProgress((oldProgress) => Math.max(oldProgress - 12.5, 0));
  };
  /* input onchange field */
  const handleInputChange = (e) => {
    let newValue = { ...boardData };
    if (e.target.name === "equipmentAvailable") {
      newValue[e.target.name] = e.target.checked;
    } else if (e.target.name === "diveCourses") {
      newValue[e.target.name] = e.target.checked;
    } else {
      newValue[e.target.name] = e.target.value;
    }

    setBoardData(newValue);
  };

  /* LiveBoard Input handler */
  const handleLiveboarChange = async (event) => {
    const { name, value } = event.target;
    if (name === "Picture") {
      const files = event.target.files[0];

      if (files && files.size > 2 * 1024 * 1024) {
        // setFileError('File size exceeds the limit (2MB). Please choose a smaller file.');
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        const compressedBase64 = await compressAndConvertToBase64(
          files,
          800,
          600,
          0.8
        );
        setBoardData((prevState) => ({
          ...prevState,
          liveABoard: {
            ...prevState.liveABoard,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setBoardData((prevState) => ({
        ...prevState,
        liveABoard: {
          ...prevState.liveABoard,
          [name]: value, // Using computed property name
        },
      }));
    }
  };
  /* accommodation Input handler */
  const handleAccommodationChange = async (event) => {
    const { name, value } = event.target;

    if (name === "Picture") {
      const files = event.target.files[0];
      if (files && files.size > 2 * 1024 * 1024) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        const compressedBase64 = await compressAndConvertToBase64(
          files,
          800,
          600,
          0.8
        );
        setBoardData((prevState) => ({
          ...prevState,
          accommodation: {
            ...prevState.accommodation,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setBoardData((prevState) => ({
        ...prevState,
        accommodation: {
          ...prevState.accommodation,
          [name]: value, // Using computed property name
        },
      }));
    }
  };
  /* accommodation Input handler */
  const handleDivingChange = async (event) => {
    const { name, value } = event.target;
    if (name === "Picture") {
      const files = event.target.files[0];
      if (files && files.size > 2 * 1024 * 1024) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        const compressedBase64 = await compressAndConvertToBase64(
          files,
          800,
          600,
          0.8
        );
        setBoardData((prevState) => ({
          ...prevState,
          diving: {
            ...prevState.diving,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setBoardData((prevState) => ({
        ...prevState,
        diving: {
          ...prevState.diving,
          [name]: value, // Using computed property name
        },
      }));
    }
  };
  /* Food Input handler */
  const handleFoodsChange = async (event) => {
    const { name, value } = event.target;
    if (name === "Picture") {
      const files = event.target.files[0];
      if (files && files.size > 2 * 1024 * 1024) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        const compressedBase64 = await compressAndConvertToBase64(
          files,
          800,
          600,
          0.8
        );
        setBoardData((prevState) => ({
          ...prevState,
          foodOnboard: {
            ...prevState.foodOnboard,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setBoardData((prevState) => ({
        ...prevState,
        foodOnboard: {
          ...prevState.foodOnboard,
          [name]: value, // Using computed property name
        },
      }));
    }
  };

  /* handle env feild change */
  const handleEnvChange = (event) => {
    const { name, value } = event.target;

    setBoardData((prevState) => ({
      ...prevState,
      environmentalQuestions: {
        ...prevState.environmentalQuestions,
        [name]: value, // Using computed property name
      },
    }));
  };

  /*  image uploader base64 */
  const handleImageChanges = async (name, value) => {
    let files = value;
    if (files && files.size > 2 * 1024 * 1024) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer:
          "File size exceeds the limit (2MB). Please choose a smaller file.",
      });
    } else {
      const compressedBase64 = await compressAndConvertToBase64(
        files,
        800,
        600,
        0.8
      );
      let newValue = { ...boardData };
      newValue[name] = compressedBase64;
      setBoardData(newValue);
    }
  };
  // console.log(fileError);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };

  const submitData = (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    fetch(`${baseUrl}/boats/create-boat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        ...boardData,
        carousal: caruselImages,
        cabins: cabinsData,
        schedules: itineraryData,
        exclusions: selectedExclusions,
        facilities: selectedFacilities,
        inclusions: selectedInclusions,
        equipment: selectedEquipments,
        diveCourses: selectedBoatDive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your boat added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setSubmitLoader(false);
          rotuer.push("/dashboard/boat");
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoader(false);
      });
  };

  // console.log({ boardData });
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            handleInputChange={handleInputChange}
            cabinsData={cabinsData}
            setCabinsData={setCabinsData}
            caruselImages={caruselImages}
            setCaruselImages={setCaruselImages}
            handleImageChanges={handleImageChanges}
            boardData={boardData}
          />
        );
      case 2:
        return (
          <LiveaBoard
            boardData={boardData}
            handleLiveboarChange={handleLiveboarChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 3:
        return (
          <Accommodation
            boardData={boardData}
            handleAccommodationChange={handleAccommodationChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 4:
        return (
          <Diving
            boardData={boardData}
            handleDivingChange={handleDivingChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 5:
        return (
          <FoodOnBoard
            boardData={boardData}
            handleFoodsChange={handleFoodsChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 6:
        return (
          <CheckFeilds
            boardData={boardData}
            selectedFacilities={selectedFacilities}
            setSelectedFacilities={setSelectedFacilities}
            selectedExclusions={selectedExclusions}
            setSelectedExclusions={setSelectedExclusions}
            selectedInclusions={selectedInclusions}
            setSelectedInclusions={setSelectedInclusions}
            selectedEquipments={selectedEquipments}
            setSelectedEquipments={setSelectedEquipments}
            selectedBoatDive={selectedBoatDive}
            setSelectedBoatDive={setSelectedBoatDive}
            handleInputChange={handleInputChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 7:
        return (
          <EnvQAndA
            boardData={boardData}
            handleEnvChange={handleEnvChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 8:
        return (
          <BoardTable
            setItineraryData={setItineraryData}
            itineraryData={itineraryData}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
            submitData={submitData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center text-black mt-5 font-bold">
        Add New Boat
      </h1>
      <div className="max-w-screen-xl mx-auto mt-10">
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: "#AFCDB1",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "green", // Change this to your desired color
              },
            }}
          />
        </Box>

        <div className="my-5">{renderStep()}</div>
      </div>
    </div>
  );
};

export default AddBoat;
