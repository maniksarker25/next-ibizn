import { baseUrl } from "@/src/config/serverConfig";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import BankInformationModal from "./BankInformationModal";
import { userContext } from "@/src/storage/contextApi";
import { ClipLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BankInformation = () => {
  const [bankInformation, setBankInformation] = useState(null);
  const [controlBank, setControlBank] = useState(false);
  const [openBankInfoModal, setOpenBankInfoModal] = React.useState(false);
  const [updateBank, setUpdateBank] = useState("");
  const { submitLoader, setSubmitLoader } = useContext(userContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleLocalBankClick = () => {
    setUpdateBank("localBank");
    handleOpen();
  };
  const handleWiseBankClick = () => {
    setUpdateBank("wiseBank");
    handleOpen();
  };

  // update wise bank information
  const updateWiseBankInfo = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const wiseBank = { email };
    setSubmitLoader(true);
    fetch(`${baseUrl}/bank-information`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ wiseBank }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Wise bank added successfully");
          setControlBank(!controlBank);
          setOpen(false);
          setSubmitLoader(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
        toast.error("Something went wrong");
      });
  };
  // update local bank information

  const updateLocalBankInfo = (e) => {
    e.preventDefault();
    const form = e.target;
    const bankName = form.bankName.value;
    const accountNumber = form.accountNumber.value;
    const routingNumber = form.routingNumber.value;
    const accountHolderName = form.accountHolderName.value;
    const accountHolderAddress = form.accountHolderAddress.value;
    const accountIbanNumber = form.accountIbanNumber.value;
    const swiftCode = form.swiftCode.value;
    const accountHolderContact = form.accountHolderContact.value;
    const localBank = {
      bankName,
      accountNumber,
      routingNumber,
      accountHolderName,
      accountHolderAddress,
      accountIbanNumber,
      swiftCode,
      accountHolderContact,
    };
    setSubmitLoader(true);
    fetch(`${baseUrl}/bank-information`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ localBank }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Local bank added successfully");
          setControlBank(!controlBank);
          setOpen(false);
          setSubmitLoader(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
        toast.error("Something went wrong");
      });
  };

  // get bank information
  useEffect(() => {
    fetch(`${baseUrl}/bank-information`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBankInformation(data?.data);
      });
  }, [controlBank]);
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold border-b-2 pb-2 border-indigo-200">
        Bank information for booking payments{" "}
      </h1>
      <div>
        {bankInformation ? (
          <div>
            {bankInformation?.localBank ? (
              <div>
                <div className="flex justify-between border-b-2 pb-2 border-indigo-200 mt-4">
                  <h1 className="text-lg font-semibold">Local Bank </h1>
                  <EditNoteIcon
                    onClick={handleLocalBankClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="flex justify-between mt-5 ">
                  <div>
                    <h3>
                      <span className="font-semibold block">
                        Account holder name
                      </span>
                      <p>{bankInformation?.localBank?.accountHolderName}</p>
                    </h3>
                    <h3 className="mt-5">
                      <span className="font-semibold block">
                        Account number
                      </span>{" "}
                      <p>{bankInformation?.localBank?.accountNumber}</p>
                    </h3>
                    <h3 className="mt-5">
                      <span className="font-semibold block">
                        Account holder address
                      </span>{" "}
                      <p>{bankInformation?.localBank?.accountHolderAddress}</p>
                    </h3>
                    <h3 className="mt-5">
                      <span className="font-semibold block">
                        Account iban number
                      </span>{" "}
                      <p>{bankInformation?.localBank?.accountIbanNumber}</p>
                    </h3>
                  </div>
                  <div>
                    <h4>
                      <span className="font-semibold block">Bank name</span>{" "}
                      <p>{bankInformation?.localBank?.bankName}</p>
                    </h4>
                    <h4 className="mt-5">
                      <span className="font-semibold block">
                        ACH Routing Number
                      </span>{" "}
                      <p>{bankInformation?.localBank?.routingNumber}</p>
                    </h4>
                    <h4 className="mt-5">
                      <span className="font-semibold block">
                        Account holder contact
                      </span>{" "}
                      <p>{bankInformation?.localBank?.accountHolderContact}</p>
                    </h4>
                    <h4 className="mt-5">
                      <span className="font-semibold block">Swift code</span>{" "}
                      <p>{bankInformation?.localBank?.swiftCode}</p>
                    </h4>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-lg font-semibold border-b-2 pb-2 border-indigo-200 my-4">
                  Local Bank{" "}
                </h1>
                <div className="flex justify-center ">
                  <button
                    onClick={handleLocalBankClick}
                    className="bg-green-500 text-white rounded-md px-3 py-1"
                  >
                    Add local bank
                  </button>
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between border-b-2 pb-2 border-indigo-200 mt-4">
                <h1 className="text-xl font-semibold">Wise</h1>
                <EditNoteIcon
                  onClick={handleWiseBankClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {bankInformation?.wiseBank ? (
                <div className="mt-3">
                  <span className="font-semibold block">Email</span>{" "}
                  <p>{bankInformation?.wiseBank?.email}</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleWiseBankClick}
                      className="bg-green-500 text-white rounded-md px-3 py-1"
                    >
                      Add wise bank
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center mt-4 text-xl font-medium">
              Please add your bank information
            </h2>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setOpenBankInfoModal(true)}
                className="bg-green-500 text-white rounded-md px-4 py-2"
              >
                Add bank information
              </button>
            </div>
          </div>
        )}
      </div>
      <BankInformationModal
        setOpenBankInfoModal={setOpenBankInfoModal}
        openBankInfoModal={openBankInfoModal}
        controlBank={controlBank}
        setControlBank={setControlBank}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {updateBank === "localBank" ? (
            <form
              className="h-[60vh] overflow-scroll"
              onSubmit={updateLocalBankInfo}
            >
              <div className="mt-3 ">
                <p className="text-lg font-semibold">Bank Name:</p>
                <input
                  type="text"
                  name="bankName"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.bankName}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">ACH Routing Number:</p>
                <input
                  type="number"
                  name="routingNumber"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.routingNumber}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">Account Number:</p>
                <input
                  type="text"
                  name="accountNumber"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.accountNumber}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">Account Holder Name:</p>
                <input
                  type="text"
                  name="accountHolderName"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.accountHolderName}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">Account Holder Address:</p>
                <input
                  type="text"
                  name="accountHolderAddress"
                  className="w-full rounded-md"
                  required
                  defaultValue={
                    bankInformation?.localBank?.accountHolderAddress
                  }
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">Account IBAN number :</p>
                <input
                  type="number"
                  name="accountIbanNumber"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.accountIbanNumber}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">BIC/Swift Code :</p>
                <input
                  type="text"
                  name="swiftCode"
                  className="w-full rounded-md"
                  required
                  defaultValue={bankInformation?.localBank?.swiftCode}
                />
              </div>
              <div className="mt-3">
                <p className="text-lg font-semibold">
                  Account Holder Contact :
                </p>
                <input
                  type="text"
                  name="accountHolderContact"
                  className="w-full rounded-md"
                  required
                  defaultValue={
                    bankInformation?.localBank?.accountHolderContact
                  }
                />
              </div>
              <button
                disabled={submitLoader}
                type="submit"
                className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
              </button>
            </form>
          ) : (
            <form onSubmit={updateWiseBankInfo}>
              <div className="mt-3">
                <p className="text-lg font-semibold">Email:</p>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-md"
                  defaultValue={bankInformation?.wiseBank?.email}
                />
              </div>
              <button
                disabled={submitLoader}
                type="submit"
                className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Submit"}
              </button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BankInformation;
