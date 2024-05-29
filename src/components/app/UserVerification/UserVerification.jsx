import { baseUrl } from "@/src/config/serverConfig";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const UserVerification = ({ id }) => {
  // verify user ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${baseUrl}/users/verify-user`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: id && id,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Swal.fire("Verification Successful.Please login");
          router.push("/auth");
          setLoading(false);
        } else {
          setError(data.message);
        }
      });
  }, [id]);

  if (loading) {
    <h1>Verifying------</h1>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* <h3 className="my-10 font-semibold text-center text-3xl">
        Please verify you account
      </h3>
      <div className="flex items-center justify-center">
        <button
          onClick={handleVerifyUser}
          className="text-white font-semibold text-lg bg-red-500 px-6 py-3 rounded"
        >
          Verify
        </button>
      </div> */}
      {error && (
        <p className="text-red-600 font-semibold text-2xl text-center">
          Something went wrong
        </p>
      )}
    </div>
  );
};

export default UserVerification;
