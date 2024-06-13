import { baseUrl } from "@/src/config/serverConfig";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
const AddPackage = () => {
  const router = useRouter();
  const [packageData, setPackageData] = useState({
    fullBoard: false,
    breakfast: false,
    upgradeable: false,
    divingCourses: false,
  });
  const [error, setError] = useState("");
  const handlePackageDataOnChange = (e) => {
    const newPackageData = { ...packageData };
    newPackageData[e.target.name] = e.target.value;
    setPackageData(newPackageData);
  };

  /// handle package submit

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(`${baseUrl}/packages/create-package`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        packageName: packageData?.packageName,
        numberOfDay: parseInt(packageData?.numberOfDay),
        numberOfNight: parseInt(packageData?.numberOfNight),
        roomType: packageData?.roomType,
        numberOfDivies: parseInt(packageData?.numberOfDivies),
        fullBoard: packageData?.fullBoard,
        breakfast: packageData?.breakfast,
        upgradeable: packageData?.upgradeable,
        // resortDailySchedule: packageData?.resortDailySchedule,
        divingCourses: packageData?.divingCourses,
        price: parseFloat(packageData?.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("nice");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Awesome, Your Package Has Been Successfully Created.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          router.push("/dashboard/resort");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // console.log(packageData);
  return (
    <div className="max-w-screen-lg mx-auto ">
      <h3 className="text-center font-semibold text-3xl">
        Please add your accommodation and dive package
      </h3>
      <div className="mt-10">
        <form onSubmit={handlePackageSubmit}>
          <div className="lg:flex gap-3 items-center">
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Package Name</p>
              <input
                onChange={handlePackageDataOnChange}
                type="text"
                name="packageName"
                required
                placeholder="Package Name"
                className="w-full rounded-md"
              />
            </div>
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Price</p>
              <input
                onChange={handlePackageDataOnChange}
                type="number"
                required
                name="price"
                placeholder="Price"
                className="w-full rounded-md"
              />
            </div>
          </div>
          <div className="lg:flex gap-3 justify-between">
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Room Type</p>
              <input
                onChange={handlePackageDataOnChange}
                type="text"
                name="roomType"
                required
                placeholder="Room Type"
                className="w-full rounded-md"
              />
            </div>
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Number of Dives</p>
              <input
                onChange={handlePackageDataOnChange}
                type="number"
                required
                name="numberOfDivies"
                placeholder="Number of Dives"
                className="w-full rounded-md"
              />
            </div>
          </div>
          <div className="lg:flex gap-3 justify-between">
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Full Board</p>
              <select
                onChange={handlePackageDataOnChange}
                name="fullBoard"
                className="select w-full "
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Breakfast</p>
              <select
                onChange={handlePackageDataOnChange}
                name="breakfast"
                className="select w-full "
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className="lg:flex gap-3 justify-between">
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Upgradeable</p>
              <select
                onChange={handlePackageDataOnChange}
                name="upgradeable"
                className="select w-full "
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Diving Courses</p>
              <select
                onChange={handlePackageDataOnChange}
                name="drivingCourses"
                className="select w-full "
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className="lg:flex gap-3 items-center">
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Number of Days</p>
              <input
                onChange={handlePackageDataOnChange}
                type="number"
                required
                name="numberOfDay"
                placeholder="Number of Days"
                className="w-full rounded-md"
              />
            </div>
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Number of Nights</p>
              <input
                onChange={handlePackageDataOnChange}
                type="number"
                required
                name="numberOfNight"
                placeholder="Number of Days"
                className="w-full rounded-md"
              />
            </div>
          </div>
          {/* <div className="mt-3">
            <p className="text-lg font-semibold">Resort daily schedule</p>
            <textarea
              onChange={handlePackageDataOnChange}
              type="text"
              required
              name="resortDailySchedule"
              placeholder="Resort daily schedule"
              className="w-full h-20 rounded-md"
            />
          </div> */}
          {error && <p className="text-red-600 text-xl mb-3">{error}</p>}

          <input
            className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
