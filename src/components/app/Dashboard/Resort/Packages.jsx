import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../core/shared/Loader/Loader";
import { useRouter } from "next/router";
import EditPackageModal from "./editPackage/EditPackageModal";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
const Packages = () => {
  const router = useRouter();

  const [packages, setPackages] = useState([]);
  const [packageControl, setPackageControl] = useState(false);
  const { loader, setLoader } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [singlePackageData, setSinglepackageId] = useState({});
  const handleOpen = (data) => {
    setSinglepackageId({ id: data });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // console.log(packages);

  // get packages for this user
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/packages/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackages(data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [packageControl]);

  const handlePackageDelete = (id) => {
    fetch(`${baseUrl}/packages/delete-package/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPackageControl(!packageControl);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Package deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {packages?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-1 border-b">PACKAGE NAME</th>
                <th className="py-2 px-1 border-b">ROOM TYPE</th>
                <th className="py-2 px-1 border-b">PRICE</th>
                <th className="py-2 px-1 border-b">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {packages?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                  }
                >
                  <td className="py-2 px-4 border-b">{item?.packageName}</td>
                  <td className="py-2 px-4 border-b">{item?.roomType}</td>
                  <td className="py-2 px-4 border-b">{item?.price}</td>

                  <td className="py-2 px-4 border-b flex justify-center">
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleOpen(item?._id)}
                        className="px-3 py-1 rounded bg-indigo-500 text-white flex gap-2 items-center"
                      >
                        <span>Edit</span> <EditNoteOutlined />
                      </button>
                      <button
                        onClick={() => handlePackageDelete(item?._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white flex gap-2 items-center"
                      >
                        <span>Delete</span> <DeleteOutline />
                      </button>
                    </div>
                  </td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Typography component={"h4"} variant="h4">
          There is no package{" "}
        </Typography>
      )}
      {open && (
        <EditPackageModal
          open={open}
          handleClose={handleClose}
          singlePackageData={singlePackageData}
          setPackageControl={setPackageControl}
        />
      )}
    </>
  );
};

export default Packages;
