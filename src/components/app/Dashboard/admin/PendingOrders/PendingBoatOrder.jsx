import { baseUrl } from "@/src/config/serverConfig";
import { useEffect, useState } from "react";
import Region from "./Helpers/Region";
import Country from "./Helpers/Country";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/router";
import { Dropdown } from "flowbite-react";
const PendingBoatOrder = () => {
  const [pendingBooking, setPendingBooking] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch(`${baseUrl}/boat-booking/pending-booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPendingBooking(data?.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-1 border-b">Booking Id</th>
            <th className="py-2 px-1 border-b">Booking Status</th>
            <th className="py-2 px-1 border-b">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pendingBooking?.map((booking, index) => (
            <tr
              key={booking?._id}
              className={
                index % 2 === 0 ? "bg-gray-100 text-center" : "text-center"
              }
            >
              <td className="py-2 px-4 border-b">{booking?._id}</td>
              <td className="py-2 px-4 border-b">{booking?.bookingStatus}</td>

              <td className="py-2 px-4 border-b">
                <div className="space-x-3 flex justify-end">
                  <button
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                    onClick={() =>
                      router.push(
                        `pending-orders/boat-order-edit/${booking?._id}`
                      )
                    }
                  >
                    View
                  </button>
                  <Dropdown label="Action" dismissOnClick={false}>
                    <Dropdown.Item>Approve</Dropdown.Item>
                    <Dropdown.Item>Reject</Dropdown.Item>
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBoatOrder;
