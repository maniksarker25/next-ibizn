import { baseUrl } from "@/src/config/serverConfig";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { userContext } from "@/src/storage/contextApi";
import Loader from "../../../core/shared/Loader/Loader";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
import Link from "next/link";
import EditBoatModal from "./EditBoat/EditBoat";
import { Typography } from "@mui/material";

const Boats = () => {
  const { loader, setLoader } = useContext(userContext);
  const [boats, setBoats] = useState([]);
  const [boatControl, setBoatControl] = useState(false);
  // get resorts
  useEffect(() => {
    setLoader(true);
    fetch(`${baseUrl}/boats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoats(data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [boatControl]);

  // handle boat delete
  const handleBoatDelete = (id) => {
    fetch(`${baseUrl}/boats/delete-boat/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBoatControl(!boatControl);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Boat deleted successfully",
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
    <div>
      {boats?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="text-left ">
              <tr className="">
                <th className="py-2 px-5 border-b">BOAT NAME</th>
                <th className="py-2 px-5 border-b">FEATURED IMAGE</th>
                <th className="py-2 px-5 border-b">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {boats?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100 " : ""}
                >
                  <td className="py-2 px-4 border-b">{item?.nameOfProperty}</td>
                  <td className="py-2 px-4 border-b ">
                    <img
                      className="w-10 h-10 rounded"
                      src={item?.featuredImage}
                      alt="featuredImage"
                    />
                  </td>
                  <td className="py-2  border-b">
                    <div className="flex items-center gap-3">
                      {/* <EditBoat id={item._id} /> */}
                      <Link href={`/dashboard/boat/edit-boat/${item?._id}`}>
                        <button className="px-3 py-1 rounded bg-indigo-600 text-white flex gap-2 items-center">
                          <span>Edit</span> <EditNoteOutlined />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleBoatDelete(item?._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white flex items-center gap-2"
                      >
                        Delete <DeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Typography component={"h4"} variant="h4">
          There is no boat{" "}
        </Typography>
      )}
    </div>
  );
};

export default Boats;
