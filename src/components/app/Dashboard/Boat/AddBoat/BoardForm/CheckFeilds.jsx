import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Spinner from "../../../../../core/shared/Loader/Loader";
import { userContext } from "@/src/storage/contextApi";

const CheckFeilds = ({
  selectedFacilities,
  setSelectedFacilities,
  selectedExclusions,
  setSelectedExclusions,
  selectedInclusions,
  setSelectedInclusions,
  selectedEquipments,
  setSelectedEquipments,
  selectedBoatDive,
  setSelectedBoatDive,
  handleInputChange,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  boardData,
}) => {
  console.log({ boardData });
  const { loader, setLoader } = useContext(userContext);
  const [inclusionShowOthers, setInclusionShowOthers] = useState(false);
  const [exclusionsShowOthers, setExclusionsShowOthers] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [boatDive, setBoatDive] = useState([]);

  // facilities data
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/boat-facilities`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data?.data);
        setLoader(false);
      })
      .catch((err) => setLoader(false));
  }, []);

  // Inclusions data
  useEffect(() => {
    fetch(`${baseUrl}/boat-inclusions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setInclusions(data?.data));
  }, []);

  // Exclusions data
  useEffect(() => {
    fetch(`${baseUrl}/boat-exclusions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setExclusions(data?.data));
  }, []);

  // equipment data
  useEffect(() => {
    fetch(`${baseUrl}/boat-equipments`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setEquipments(data?.data));
  }, []);

  // boat dive-courses data
  useEffect(() => {
    fetch(`${baseUrl}/boat-dive-courses`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setBoatDive(data?.data));
  }, []);

  /* handle facilities */
  const handleCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedFacilities((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedFacilities((prevSelected) =>
        prevSelected.filter((facility) => facility !== checkboxValue)
      );
    }
  };
  /* handle exclusions */
  const handleExclusionsCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedExclusions((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedExclusions((prevSelected) =>
        prevSelected.filter((exclusion) => exclusion !== checkboxValue)
      );
    }
  };
  /* handle Inclusions */
  const handleInclusionsCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedInclusions((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedInclusions((prevSelected) =>
        prevSelected.filter((inclusion) => inclusion !== checkboxValue)
      );
    }
  };

  const handleEquipmentsCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedEquipments((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedEquipments((prevSelected) =>
        prevSelected.filter((equipment) => equipment !== checkboxValue)
      );
    }
  };

  const handleBoatDiveCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedBoatDive((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedBoatDive((prevSelected) =>
        prevSelected.filter((boatDive) => boatDive !== checkboxValue)
      );
    }
  };
  /* add resort state */

  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };
  // go to previous step ------------
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };

  if (loader) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="my-4 text-xl pb-2 border-b-2">Facilities</h2>

      <form onSubmit={goToNextStep}>
        <div className="mb-4">
          {facilities?.map((facility) => (
            <label key={facility?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={facility?.name}
                defaultChecked={facility?.name || ""}
                checked={selectedFacilities.includes(facility?.name)}
                onChange={handleCheckBoxChange}
              />
              {facility?.name}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Inclusions</h2>
          {inclusions?.map((inclusion) => (
            <label key={inclusion?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={inclusion?.name}
                defaultChecked={inclusion?.name || ""}
                checked={selectedInclusions.includes(inclusion?.name)}
                onChange={handleInclusionsCheckBoxChange}
              />
              {inclusion?.name}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Exclusions</h2>

          {exclusions?.map((exclusions) => (
            <label key={exclusions?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={exclusions?.name}
                defaultChecked={exclusions?.name || ""}
                checked={selectedExclusions.includes(exclusions?.name)}
                onChange={handleExclusionsCheckBoxChange}
              />
              {exclusions?.name}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Equipments</h2>
          {equipments?.map((equipments) => (
            <label key={equipments?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={equipments?.name}
                defaultChecked={equipments?.name || ""}
                checked={selectedEquipments.includes(equipments?.name)}
                onChange={handleEquipmentsCheckBoxChange}
              />
              {equipments?.name}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Boat on Dive</h2>
          {boatDive?.map((boatDive) => (
            <label key={boatDive?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={boatDive?.name}
                defaultChecked={boatDive?.name || ""}
                checked={selectedBoatDive.includes(boatDive?.name)}
                onChange={handleBoatDiveCheckBoxChange}
              />
              {boatDive?.name}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-10">
          {currentStep > 1 && (
            <button
              onClick={goToPrevStep}
              className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              // onClick={submitData}
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CheckFeilds;
