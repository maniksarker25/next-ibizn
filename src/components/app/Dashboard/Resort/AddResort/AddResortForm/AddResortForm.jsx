import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import PropertyDesc from "./PropertyDesc";
import Accommodation from "./Accommodation";
import Diving from "./Diving";
import Room from "./Room";
import FoodAtTheResort from "./FoodAtTheResort";
import CheckFeilds from "./CheckFeilds";
import { compressAndConvertToBase64 } from "@/src/config/base64";
import { baseUrl } from "@/src/config/serverConfig";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useRouter } from "next/router";
import { userContext } from "@/src/storage/contextApi";
import EnvQAndA from "./EnvQAndA";
const AddResortForm = ({ increaseProgress, decreaseProgress }) => {
  const rotuer = useRouter();
  const { submitLoader, setSubmitLoader } = useContext(userContext);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [listofPackages, setListOfPackages] = useState([]);
  const [caruselImages, setCaruselImages] = useState([]);
  const [deactivitionDate, setDeactivitionDate] = useState({});
  const [discountTimeFrameDate, setDiscountTimeFrameDate] = useState({});
  const [resortData, setResortData] = useState({
    accommodation: {},
    diving: {},
  });
  // console.log("deactivations: ", deactivitionDate);
  // console.log("discount time: ", discountTimeFrameDate);

  // console.log(resortData);
  const handleInputChange = (e) => {
    let newValue = { ...resortData };
    if (e.target.name === "special") {
      newValue[e.target.name] = e.target.checked;
    } else if (e.target.name === "equipmentAvailable") {
      newValue[e.target.name] = e.target.checked;
    } else if (e.target.name === "diveCourseAvailable") {
      newValue[e.target.name] = e.target.checked;
    } else {
      newValue[e.target.name] = e.target.value;
    }
    setResortData(newValue);
  };

  const handleAccommodationChange = async (event) => {
    const { name, value } = event.target;
    if (name === "image") {
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
        setResortData((prevState) => ({
          ...prevState,
          accommodation: {
            ...prevState.accommodation,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setResortData((prevState) => ({
        ...prevState,
        accommodation: {
          ...prevState.accommodation,
          [name]: value, // Using computed property name
        },
      }));
    }
  };

  const handleDivingChange = async (event) => {
    const { name, value } = event.target;
    if (name === "image") {
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
        setResortData((prevState) => ({
          ...prevState,
          diving: {
            ...prevState.diving,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setResortData((prevState) => ({
        ...prevState,
        diving: {
          ...prevState.diving,
          [name]: value,
        },
      }));
    }
  };
  const handleFoodsChange = async (event) => {
    const { name, value } = event.target;
    if (name === "image") {
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
        setResortData((prevState) => ({
          ...prevState,
          food: {
            ...prevState.food,
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setResortData((prevState) => ({
        ...prevState,
        food: {
          ...prevState.food,
          [name]: value, // Using computed property name
        },
      }));
    }
  };

  const handleRoomsChange = async (event) => {
    const { name, value } = event.target;
    if (name === "image") {
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
        setResortData((prevState) => ({
          ...prevState,
          rooms: {
            ...prevState.rooms,
            [name]: compressedBase64, // Using computed property name
          },
        }));
      }
    } else {
      setResortData((prevState) => ({
        ...prevState,
        rooms: {
          ...prevState.rooms,
          [name]: value, // Using computed property name
        },
      }));
    }
  };
  const handleEnvChange = (event) => {
    const { name, value } = event.target;

    setResortData((prevState) => ({
      ...prevState,
      environmentalQuestions: {
        ...prevState.environmentalQuestions,
        [name]: value,
      },
    }));
  };

  const handleImageChanges = async (name, value) => {
    const files = value;
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
      let newValue = { ...resortData };
      newValue[name] = compressedBase64;
      setResortData(newValue);
    }
  };

  // console.log("form add", resortData);

  /* submit resort */
  const handleResortSubmit = (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    fetch(`${baseUrl}/resorts/create-resort`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        ...resortData,
        // listOfPackages: [...listofPackages],
        carousalImages: [...caruselImages],
        deactivationPeriod: {
          ...deactivitionDate,
        },
        discountTimeFrame: {
          ...discountTimeFrameDate,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your resort added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setSubmitLoader(false);
          rotuer.push("/dashboard/resort");
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoader(false);
      });
  };
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            resortdata={resortData}
            caruselImages={caruselImages}
            setCaruselImages={setCaruselImages}
            setListOfPackages={setListOfPackages}
            listofPackages={listofPackages}
            resortData={resortData}
            setResortData={setResortData}
            handleInputChange={handleInputChange}
            handleImageChanges={handleImageChanges}
            setDeactivitionDate={setDeactivitionDate}
            deactivitionDate={deactivitionDate}
            discountTimeFrameDate={discountTimeFrameDate}
            setDiscountTimeFrameDate={setDiscountTimeFrameDate}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      case 2:
        return (
          <PropertyDesc
            resortData={resortData}
            handleInputChange={handleInputChange}
            handleImageChanges={handleImageChanges}
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
            resortData={resortData}
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
            resortData={resortData}
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
          <FoodAtTheResort
            resortData={resortData}
            handleFoodsChange={handleFoodsChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        );
      // case 6:
      //   return (
      //     <Room
      //       resortData={resortData}
      //       handleRoomsChange={handleRoomsChange}
      //       totalSteps={totalSteps}
      //       currentStep={currentStep}
      //       setCurrentStep={setCurrentStep}
      //       increaseProgress={increaseProgress}
      //       decreaseProgress={decreaseProgress}
      //     />
      //   );
      case 6:
        return (
          <CheckFeilds
            resortData={resortData}
            handleInputChange={handleInputChange}
            setResortData={setResortData}
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
            resortData={resortData}
            handleEnvChange={handleEnvChange}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
            handleResortSubmit={handleResortSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* <ProgressBar currentStep={currentStep} totalSteps={totalSteps} /> */}
      {renderStep()}
      {/* <div className='flex justify-between  mt-10'>
                {currentStep > 1 && <button onClick={goToPrevStep} className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold">Previous</button>}
                {currentStep < totalSteps ? <button className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold" onClick={goToNextStep}>Next</button> : <button className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold" onClick={handleResortSubmit}>Finish</button>}
            </div> */}
    </>
  );
};

export default AddResortForm;
