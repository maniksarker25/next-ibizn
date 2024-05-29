import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const BankAccount = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [bankName, setBankName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleOpen = (option) => {
    setOpen(true);
    setSelectedOption(option);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOption(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user, control, setControl } = useContext(userContext);

  const bankInfoHandler = () => {
    fetch(`${baseUrl}/users/update-user/${user?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },

      body: JSON.stringify({
        bankAccount: {
          localBank: {
            bankName,
            routingNumber,
            accountNumber,
            accountHolderName,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Local Bank Information added successfully");
          setControl(!control);
          router.push("/dashboard/profile");
        } else {
          toast.error(`${data.message}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const wiseBankHandler = () => {
    fetch(`${baseUrl}/users/update-user/${user?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },

      body: JSON.stringify({
        bankAccount: {
          wiseBank: {
            email,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Wise Bank Information added successfully");
          setControl(!control);
          router.push("/dashboard/profile");
        } else {
          toast.error(`${data.message}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold uppercase">Add your bank info</h1>
      </div>
      <div className="space-x-10 text-center">
        <button
          onClick={() => handleOpen("localBank")}
          className="btn  px-5 py-3 text-white font-bold rounded-md custom_red_color"
        >
          Add Local Bank
        </button>
        <button
          onClick={() => handleOpen("wesEmail")}
          className="btn px-5 py-3 text-white font-bold rounded-md custom_red_color"
        >
          Add Wise Email
        </button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <div
          className={`bg-white rounded p-8 text-black mt-10 w-10/12 md:w-8/12 lg:w-[500px] mx-auto `}
        >
          <div>
            <h1 className="text-xl font-semibold text-center">
              {selectedOption === "localBank"
                ? "Please Add Your Local Bank"
                : "Please Add Email Wise"}
            </h1>
            {selectedOption === "localBank" ? (
              <div>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Bank Name:</p>
                  <input
                    value={bankName}
                    type="text"
                    name="bankName"
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Routing Number:</p>
                  <input
                    value={routingNumber}
                    type="number"
                    name="routingNumber"
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    className="w-full rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Account Number:</p>
                  <input
                    value={accountNumber}
                    type="text"
                    name="accountNumber"
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Account Holder Name:</p>
                  <input
                    type="text"
                    name="accountHolderName"
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    value={accountHolderName}
                    className="w-full rounded-md"
                  />
                </div>
                <button
                  className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
                  onClick={bankInfoHandler}
                >
                  submit
                </button>
              </div>
            ) : (
              <>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Email:</p>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-md"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button
                  type="submit"
                  onClick={wiseBankHandler}
                  className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BankAccount;
