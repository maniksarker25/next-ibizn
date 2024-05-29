import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../../../core/shared/Loader/Loader";

const CheckFeilds = ({
  handleInputChange,
  setResortData,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  resortData,
}) => {
  console.log({ resortData });
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
  console.log(selectedExclusions);

  // get check field data
  const [facilities, setFacilities] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [diveCourses, setDiveCourses] = useState([]);

  useEffect(() => {
    if (
      resortData?.facilities ||
      resortData?.inclusions ||
      resortData?.exclusions ||
      resortData?.equipment ||
      resortData?.diveCourse
    ) {
      setSelectedFacilities(resortData?.facilities);
      setSelectedInclusions(resortData?.inclusions);
      setSelectedExclusions(resortData?.exclusions);
      setSelectedEquipments(resortData?.equipment);
      setSelectedDiveCourse(resortData?.diveCourses);
    }
  }, []);

  // useEffect(()=>{
  //   if()
  // },[])

  // facilities data
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/resort-facilities`, {
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

  // inclusion data
  useEffect(() => {
    fetch(`${baseUrl}/resort-inclusions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setInclusions(data?.data));
  }, []);

  // exclusion data
  useEffect(() => {
    fetch(`${baseUrl}/resort-exclusions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setExclusions(data?.data));
  }, []);

  // equipments data
  useEffect(() => {
    fetch(`${baseUrl}/resort-equipments`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setEquipments(data?.data));
  }, []);

  // Dive on course data
  useEffect(() => {
    fetch(`${baseUrl}/resort-dive-courses`, {
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
    setResortData((prevState) => ({
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

  const changeOtherInclusions = (value) => {
    setSelectedInclusions((prevSelected) => [...prevSelected, value]);
  };

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
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={goToNextStep}>
        <h1 className="font-bold mt-2 text-xl border-b mb-2">Sepecial</h1>
        <FormControlLabel
          name="special"
          checked={
            resortData?.special && resortData?.special === true ? true : false
          }
          control={<Switch onChange={(e) => handleInputChange(e)} />}
          label="SPECIAL FEATURE?"
        />

        <h2 className="my-4 text-xl pb-2 border-b-2">Facilities</h2>

        <div className="mb-4">
          {facilities?.map((facility) => (
            <label key={facility?._id} className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                defaultChecked={selectedFacilities}
                value={facility?.name}
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
            <div key={inclusion?._id}>
              {inclusion?.name === "other inclusions" ? (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    id="inclusions"
                    name="inclusions"
                    defaultChecked={inclusion?.name || ""}
                    onClick={() => setInclusionShowOthers(!inclusionShowOthers)}
                  />
                  {inclusion?.name}
                </label>
              ) : (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    value={inclusion?.name}
                    checked={selectedInclusions.includes(inclusion?.name)}
                    onChange={handleInclusionsCheckBoxChange}
                  />
                  {inclusion?.name}
                </label>
              )}
            </div>
          ))}

          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onChange={e => handleInputChange(e)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Exclusions  a
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onChange={e => handleInputChange(e)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Exclusions  b
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onChange={e => handleInputChange(e)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Exclusions  c
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onChange={e => handleInputChange(e)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Exclusions  d
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onClick={() => setExclusionsShowOthers(!exclusionsShowOthers)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Other exclusions
                    </label>
                    
                </div> */}
          {inclusionShowOthers && (
            <input
              placeholder="Other inclusions"
              className="mt-3 p-2 border border-gray-300 rounded-md block "
              type="text"
              name="otherInclusions"
              id=""
            />
          )}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Exclusions</h2>

          {exclusions?.map((exclusions) => (
            <div key={exclusions?._id}>
              {exclusions?.name === "other exclusions" ? (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    id="exclusions"
                    name="exclusions"
                    defaultChecked={exclusions?.name || ""}
                    className="mr-2"
                    onClick={() =>
                      setExclusionsShowOthers(!exclusionsShowOthers)
                    }
                  />
                  {exclusions?.name}
                </label>
              ) : (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    value={exclusions?.name}
                    checked={selectedExclusions.includes(exclusions?.name)}
                    onChange={handleExclusionsCheckBoxChange}
                  />
                  {exclusions?.name}
                </label>
              )}
            </div>
          ))}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion a
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion b
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion c
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusionsd"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion d
                    </label>
                </div> */}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onClick={() => setInclusionShowOthers(!inclusionShowOthers)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Other exclusions
                    </label>
                </div> */}

          {exclusionsShowOthers && (
            <input
              placeholder="Other exclusions"
              className="mt-3 p-2 border border-gray-300 rounded-md block "
              type="text"
              onChange={(e) => changeOtherInclusions(e.target.value)}
              name="otherExclusions"
              id=""
            />
          )}
        </div>

        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Equipments</h2>

          {equipments?.map((equipment) => (
            <div key={equipment?._id}>
              {equipment?.name === "other equipments" ? (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    id="equipments"
                    name="equipments"
                    defaultChecked={equipment?.name || ""}
                    className="mr-2"
                    onClick={() =>
                      setEquipmentsShowOthers(!equipmentsShowOthers)
                    }
                  />
                  {equipment?.name}
                </label>
              ) : (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    value={equipment?.name}
                    checked={selectedEquipments?.includes(equipment?.name)}
                    onChange={handleEquipmentsCheckBoxChange}
                  />
                  {equipment?.name}
                </label>
              )}
            </div>
          ))}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion a
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion b
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion c
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusionsd"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion d
                    </label>
                </div> */}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onClick={() => setInclusionShowOthers(!inclusionShowOthers)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Other exclusions
                    </label>
                </div> */}

          {equipmentsShowOthers && (
            <input
              placeholder="Other equipments"
              className="mt-3 p-2 border border-gray-300 rounded-md block "
              type="text"
              onChange={(e) => changeOtherInclusions(e.target.value)}
              name="otherEquipments"
              id=""
            />
          )}
        </div>
        <div className="mb-4">
          <h2 className="my-4 text-xl pb-2 border-b-2">Dive ON Course</h2>

          {diveCourses?.map((diveCourse) => (
            <div key={diveCourse?._id}>
              {diveCourse?.name === "other diveCourse" ? (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    id="diveCourse"
                    name="diveCourse"
                    defaultChecked={diveCourse?.name || ""}
                    className="mr-2"
                    onClick={() =>
                      setDiveCourseShowOthers(!diveCourseShowOthers)
                    }
                  />
                  {diveCourse?.name}
                </label>
              ) : (
                <label className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    value={diveCourse?.name}
                    checked={selectedDiveCourse.includes(diveCourse?.name)}
                    onChange={handleDiveCourseCheckBoxChange}
                  />
                  {diveCourse?.name}
                </label>
              )}
            </div>
          ))}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion a
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion b
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion c
                    </label>
                </div>
                <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusionsd"
                        className="mr-2"
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Inclusion d
                    </label>
                </div> */}
          {/* <div className="mx-2">
                    <input
                        type="checkbox"
                        id="exclusions"
                        name="exclusions"
                        className="mr-2"
                        onClick={() => setInclusionShowOthers(!inclusionShowOthers)}
                    />
                    <label htmlFor="exclusions" className="text-sm text-gray-700">
                        Other exclusions
                    </label>
                </div> */}

          {diveCourseShowOthers && (
            <input
              placeholder="other diveCourse"
              className="mt-3 p-2 border border-gray-300 rounded-md block "
              type="text"
              onChange={(e) => changeOtherInclusions(e.target.value)}
              name="otherDiveCourse"
              id=""
            />
          )}
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
