import { useState, useEffect } from "react";
import { baseUrl } from "@/src/config/serverConfig";
import BasicInfo from "./AllComponents/BasicInfo";
import LiveaBoard from "./AllComponents/LiveaBoard";
import Accommodation from "./AllComponents/Accommodation";
import Diving from "./AllComponents/Diving";
import FoodOnBoard from "./AllComponents/FoodOnBoard";
import CheckFields from "./AllComponents/CheckFields";
import BoardTable from "./AllComponents/BoardTable";
import EnvQAndA from "./AllComponents/EnvQAndA";
import Swal from "sweetalert2";
import { compressAndConvertToBase64 } from "@/src/config/base64";
import { useRouter } from "next/router";
import Spinner from "@/src/components/core/shared/Loader/Spinner";

export default function EditBoat({ id }) {
  const [boatData, setBoatData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // console.log({ id });
  console.log(boatData);

  useEffect(() => {
    setLoading(true)
    if (id) {
      fetch(`${baseUrl}/boats/single-boat/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBoatData(data.data);
          setLoading(false)
        });
    }
  }, [id && !boatData]);

  // handler for update boat

  const handleUpdateBoatData = () => {
    setLoading(true);
    fetch(`${baseUrl}/boats/update-boat/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify(boatData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.success === true) {
          setLoading(false);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Boat data updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/dashboard/boat");
        }
      })
      .catch((err) => {
        console.log(err), setLoading(false);
      });
  };

  // handler for diving,accommodation,liveaboard,dive course etc
  const handleBoatDataChange = async (event, category) => {
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
        setBoatData((prevState) => ({
          ...prevState,
          [category]: {
            ...prevState[category],
            [name]: compressedBase64,
          },
        }));
      }
    } else {
      setBoatData((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [name]: value, // Using computed property name
        },
      }));
    }
  };

  // handler for single image
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
      let newValue = { ...boatData };
      newValue[name] = compressedBase64;
      setBoatData(newValue);
    }
  };
  // handle environment questions change
  const handleEnvChange = (event) => {
    const { name, value } = event.target;

    setBoatData((prevState) => ({
      ...prevState,
      environmentalQuestions: {
        ...prevState.environmentalQuestions,
        [name]: value,
      },
    }));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {loader ? (
        "loading..."
      ) : (
        <>
          {" "}
          <div className="h-[80vh] overflow-y-scroll space-y-10">
            <BasicInfo
              boatData={boatData}
              setBoatData={setBoatData}
              handleImageChanges={handleImageChanges}
            />
            <LiveaBoard
              boatData={boatData}
              setBoatData={setBoatData}
              handleBoatDataChange={handleBoatDataChange}
            />
            <Accommodation
              boatData={boatData}
              setBoatData={setBoatData}
              handleBoatDataChange={handleBoatDataChange}
            />
            <Diving
              boatData={boatData}
              setBoatData={setBoatData}
              handleBoatDataChange={handleBoatDataChange}
            />
            <FoodOnBoard
              boatData={boatData}
              setBoatData={setBoatData}
              handleBoatDataChange={handleBoatDataChange}
            />
            <CheckFields boatData={boatData} setBoatData={setBoatData} />
            <BoardTable boatData={boatData} setBoatData={setBoatData} />
            <EnvQAndA
              boatData={boatData}
              setBoatData={setBoatData}
              handleEnvChange={handleEnvChange}
            />
          </div>
          <div className="fixed bottom-10 right-10">
            <button
              onClick={handleUpdateBoatData}
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
}
