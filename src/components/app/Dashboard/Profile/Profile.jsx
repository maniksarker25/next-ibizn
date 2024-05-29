import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../../core/shared/Loader/Spinner";
import { ClipLoader } from "react-spinners";

// import for model -------------------
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BankInformation from "./BankInformation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  Height: "100%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Profile = () => {
  const {
    user,
    control,
    setControl,
    loader,
    setLoader,
    setSubmitLoader,
    submitLoader,
  } = useContext(userContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phone, setPhone] = useState(String(user?.phone) || "");
  const [whatsApp, setWhatsApp] = useState(String(user?.whatsapp) || "");

  // update profile
  useEffect(() => {
    if (user?.phone) {
      setPhone(String(user.phone));
    }
    if (user?.whatsapp) {
      setWhatsApp(String(user.whatsapp));
    }
  }, [user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;

    const companyName = form.companyName.value;

    const companyAddress = form.companyAddress.value;
    const updatedUser = {
      fullName,
      companyName,
      companyAddress,
    };
    setSubmitLoader(true);
    fetch(`${baseUrl}/users/update-user/${user?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ ...updatedUser, phone, whatsapp: whatsApp }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.success) {
          setControl(!control);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your profile updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          handleClose();
          setSubmitLoader(false);
        }
      })
      .catch((err) => setSubmitLoader(false));
  };

  if (loader) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-end px-4 pt-4">
        {/* <Dropdown inline label="">
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Export Data
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </Dropdown.Item>
        </Dropdown> */}
      </div>
      <div className="max-w-screen-md mx-auto shadow-md">
        <div className="  p-10 ">
          <div>
            <div className="flex justify-between items-center">
              <h5 className="mb-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {user?.fullName}
              </h5>
              <button
                onClick={handleOpen}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                Edit Profile
              </button>
            </div>
            <span className="text-sm  dark:text-gray-400">{user?.email}</span>
          </div>
          <div className="mt-10">
            <h1 className="text-2xl font-semibold border-b-2 pb-2 border-indigo-200">
              About{" "}
            </h1>
            <div className="flex justify-between mt-5 ">
              <div>
                <h3>
                  <span className="font-semibold block">Phone </span>
                  {user?.phone}
                </h3>
                <h3 className="mt-5">
                  <span className="font-semibold block">
                    What’s App number{" "}
                  </span>{" "}
                  {user?.whatsapp}
                </h3>
              </div>
              <div>
                <h4>
                  <span className="font-semibold block">Company Name </span>{" "}
                  {user?.companyName}
                </h4>
                <h4 className="mt-5">
                  <span className="font-semibold block">Company Address </span>{" "}
                  {user?.companyAddress}
                </h4>
              </div>
            </div>
          </div>
          {user?.role !== "admin" && <BankInformation />}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2 className="text-center text-2xl font-semibold">
              Please update your profile
            </h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mt-2">
                <p>Full Name</p>
                <input
                  defaultValue={user?.fullName}
                  className="w-full "
                  type="text"
                  name="fullName"
                  id=""
                />
              </div>
              <div className="mt-2">
                <p>Phone</p>

                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={setPhone}
                  enableAreaCodes={true}
                  inputStyle={{ width: "100%" }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
              <div className="mt-2">
                <p>Company Name</p>
                <input
                  defaultValue={user?.companyName}
                  className="w-full "
                  type="text"
                  name="companyName"
                  id=""
                />
              </div>
              <div className="mt-2">
                <p>What’s App number</p>

                <PhoneInput
                  country={"us"}
                  value={whatsApp}
                  onChange={setWhatsApp}
                  enableAreaCodes={true}
                  inputStyle={{ width: "100%" }}
                  inputProps={{
                    name: "whatsapp",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
              <div className="mt-2">
                <p>Company Address</p>
                <input
                  defaultValue={user?.companyAddress}
                  className="w-full "
                  type="text"
                  name="companyAddress"
                  id=""
                />
              </div>
              <button
                disabled={submitLoader}
                className="bg-red-500 py-2 rounded w-full text-white font-semibold mt-3"
                type="submit"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
