import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../core/shared/Loader/Loader";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
const Resorts = () => {
  const router = useRouter();
  const [resorts, setResorts] = useState([]);
  const [resortControl, setResortControl] = useState(false);
  const { loader, setLoader } = useContext(userContext);
  // console.log(resorts);
  // get resorts
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/resorts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResorts(data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [resortControl]);

  const handleResortDelete = (id) => {
    fetch(`${baseUrl}/resorts/delete-resort/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResortControl(!resortControl);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Resort deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (loader) {
    return <Loader />;
  }

  const resorthandler = (id) => {
    router.push(`/dashboard/resort/edit-resort/${id}`);
  };

  return (
    <div>
      {resorts?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-1 border-b">RESORT NAME</th>
                <th className="py-2 px-1 border-b">REGION</th>
                <th className="py-2 px-1 border-b">COUNTRY</th>
                <th className="py-2 px-1 border-b">DISTRICT</th>
                <th className="py-2 px-1 border-b">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {resorts?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
                  }
                >
                  <td className="py-2 px-4 border-b">{item?.propertyName}</td>
                  <td className="py-2 px-4 border-b">{item?.region}</td>
                  <td className="py-2 px-4 border-b">{item?.country}</td>
                  <td className="py-2 px-4 border-b">{item?.district}</td>
                  <td className="py-2 px-4 border-b flex justify-center">
                    <div className="flex  gap-3 items-center">
                      <button
                        className="px-3 py-1 rounded bg-indigo-600 text-white flex gap-2 items-center"
                        onClick={() => resorthandler(item._id)}
                      >
                        <span>Edit</span> <EditNoteOutlined />
                      </button>

                      <button
                        onClick={() => handleResortDelete(item?._id)}
                        className="px-3 py-1 rounded bg-red-400 text-white flex gap-2 items-center"
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
          There is no resort{" "}
        </Typography>
      )}
    </div>
  );
};

export default Resorts;
