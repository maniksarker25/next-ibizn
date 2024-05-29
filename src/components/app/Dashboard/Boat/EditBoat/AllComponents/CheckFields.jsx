import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Spinner from "../../../../../core/shared/Loader/Spinner";
import { userContext } from "@/src/storage/contextApi";
import Loader from "@/src/components/core/shared/Loader/Loader";

const CheckFields = ({
  // selectedFacilities,
  // setSelectedFacilities,
  // selectedExclusions,
  // setSelectedExclusions,
  // selectedInclusions,
  // setSelectedInclusions,
  // selectedEquipments,
  // setSelectedEquipments,
  // selectedBoatDive,
  // setSelectedBoatDive,
  boatData,
  setBoatData,
}) => {
  const { loader, setLoader } = useContext(userContext);
  const [inclusionShowOthers, setInclusionShowOthers] = useState(false);
  const [exclusionsShowOthers, setExclusionsShowOthers] = useState(false);
  const [equipmentsShowOthers, setEquipmentsShowOthers] = useState(false);
  const [diveCourseShowOthers, setDiveCourseShowOthers] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedDiveCourse, setSelectedDiveCourse] = useState([]);

  // get check field data
  const [facilities, setFacilities] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [diveCourses, setDiveCourses] = useState([]);
  useEffect(() => {
    setBoatData((prevState) => ({
      ...prevState,
      facilities: [...selectedFacilities],
      exclusions: [...selectedExclusions],
      inclusions: [...selectedInclusions],
      equipment: [...selectedEquipments],
      diveCourses: [...selectedDiveCourse],
    }));
  }, [
    selectedFacilities,
    selectedExclusions,
    selectedInclusions,
    selectedEquipments,
    selectedDiveCourse,
  ]);

  useEffect(() => {
    if (
      boatData?.facilities ||
      boatData?.inclusions ||
      boatData?.exclusions ||
      boatData?.equipment ||
      boatData?.diveCourse
    ) {
      setSelectedFacilities(boatData?.facilities);
      setSelectedInclusions(boatData?.inclusions);
      setSelectedExclusions(boatData?.exclusions);
      setSelectedEquipments(boatData?.equipment);
      setSelectedDiveCourse(boatData?.diveCourses);
    }
  }, [!boatData]);

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
      .then((data) => setDiveCourses(data?.data));
  }, []);

  /* handle faclteis */
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
        prevSelected.filter((inclusion) => inclusion !== checkboxValue)
      );
    }
  };

  const handleDiveCourseCheckBoxChange = (event) => {
    const checkboxValue = event.target.value;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the state
      setSelectedDiveCourse((prevSelected) => [...prevSelected, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove the value from the state
      setSelectedDiveCourse((prevSelected) =>
        prevSelected.filter((inclusion) => inclusion !== checkboxValue)
      );
    }
  };

  /* add resort state */
  useEffect(() => {
    setBoatData((prevState) => ({
      ...prevState,
      facilities: [...selectedFacilities],
      exclusions: [...selectedExclusions],
      inclusions: [...selectedInclusions],
      equipment: [...selectedEquipments],
      diveCourses: [...selectedDiveCourse],
    }));
  }, [
    selectedFacilities,
    selectedExclusions,
    selectedInclusions,
    selectedEquipments,
    selectedDiveCourse,
  ]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Selection</h1>
      <form>
        <div className="mb-4">
          {facilities?.map((facility) => (
            <label key={facility?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={facility?.name}
                defaultChecked={facility?.name || ""}
                checked={selectedFacilities?.includes(facility?.name)}
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
                checked={selectedInclusions?.includes(inclusion?.name)}
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
                checked={selectedExclusions?.includes(exclusions?.name)}
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
                checked={selectedEquipments?.includes(equipments?.name)}
                onChange={handleEquipmentsCheckBoxChange}
              />
              {equipments?.name}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Boat on Dive</h2>
          {diveCourses?.map((diveCourse) => (
            <label key={diveCourse?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                value={diveCourse?.name}
                defaultChecked={diveCourse?.name || ""}
                checked={selectedDiveCourse?.includes(diveCourse?.name)}
                onChange={handleDiveCourseCheckBoxChange}
              />
              {diveCourse?.name}
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

export default CheckFields;
