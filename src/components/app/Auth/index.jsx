import { baseUrl } from "@/src/config/serverConfig";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import { ClipLoader } from "react-spinners";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { userContext } from "@/src/storage/contextApi";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Auth = () => {
  const [active, setActive] = useState("Sign Up");
  const { submitLoader, setSubmitLoader } = useContext(userContext);
  const [isSignUp, setIsSingUp] = React.useState(false);
  const [value, setValue] = useState();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loginError, setLoginError] = React.useState("");
  const [error, setError] = React.useState("");
  const { control, setControl } = useContext(userContext);
  // kdjfkdjfkdjf
  const onSubmit = (data) => {
    // console.log("data from", {...data,phone:value});
    setError("");
    setSubmitLoader(true);
    fetch(`${baseUrl}/users/sign-up`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({ ...data, phone: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          // handleClose();
          Swal.fire("Sign up successful.Please check email for verification");
          reset();

          setIsSingUp(false);
          setSubmitLoader(false);
        } else {
          setError(data.message);
          setSubmitLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoader(false);
      });
  };

  const signInUser = (data) => {
    console.log("signInUser", data);
    setLoginError("");
    setSubmitLoader(true);
    fetch(`${baseUrl}/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.success) {
          // console.log(data?.data);
          const token = data?.data?.token;
          localStorage.setItem("access-token", token);
          toast.success("login successfully");
          setControl(!control);
          setSubmitLoader(false);

          // if (data?.data?.user?.bankAccount) {
          //
          // } else {
          //   router.push("/dashboard/profile");

          // }
          router.push("/dashboard/profile");
        } else {
          setSubmitLoader(false);
          console.log(data);
          setLoginError(data?.message);
        }
      })
      .catch((err) => {
        console.error("Error during sign-in:", err);
        setSubmitLoader(false);
      });
  };

  return (
    <div
      className={`bg-white rounded p-8 text-black w-10/12 md:w-8/12 lg:w-[500px] mx-auto mt-16 md:mt-24 lg:mt-36 shadow-lg shadow-gray-400 ${
        isSignUp === "signIn" ? "mt-32" : "mt-4"
      } `}
    >
      {!isSignUp ? (
        <div>
          <h1 className="text-center text-2xl font-semibold">
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit(signInUser)}>
            <div className="mt-4 w-full">
              <p className="text-lg font-semibold">Your email</p>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="w-full rounded-md"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
            <div className="mt-3 w-full">
              <p className="text-lg font-semibold">Password</p>
              <label className="flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="w-full rounded-md"
                />
                <button
                  type="button"
                  className="-ms-7"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </button>
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
            </div>
            {loginError && <p className="text-red-600 my-2">{loginError}</p>}
            {/* <input
              className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
              type="submit"
              value="Sign In"
            /> */}
            <div>
              <button
                disabled={submitLoader}
                className="w-full rounded-md  custom_red_color py-3 my-4 text-white font-semibold"
                type="submit"
              >
                {submitLoader ? <ClipLoader color="#ffff" /> : "Sign In"}
              </button>
            </div>
            <p className="text-center">
              Don’t have an account yet?
              <span
                onClick={() => {
                  setIsSingUp(true), setShowPass(false), reset();
                }}
                className="font-semibold cursor-pointer"
              >
                {" "}
                Sign Up
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-center">
            Create an account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <p className="text-lg font-semibold">Your Full Name</p>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", {
                  required: true,
                  minLength: 2,
                  maxLength: 80,
                })}
                className="w-full rounded-md"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">Name is required</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-600">
                  Name must be at least 2 characters
                </p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="text-red-600">Name cannot exceed 80 characters</p>
              )}
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Your Email</p>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="w-full rounded-md"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Your Phone</p>

              {/* <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="BD"
                value={value}
                onChange={setValue}
                className="flex"
                onlyCountries={['bd']}
                flags={false}
              /> */}
              <PhoneInput
                country={"us"}
                value={value}
                onChange={setValue}
                enableAreaCodes={true}
                inputStyle={{ width: "100%" }}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
              />

              {errors.number?.type === "required" && (
                <p className="text-red-600">Number is required</p>
              )}
              {errors.number?.type === "minLength" && (
                <p className="text-red-600">
                  Number must be at least 6 characters
                </p>
              )}
              {/* {errors.number?.type === "maxLength" && (
                <p className="text-red-600">
                  Number cannot exceed 12 characters
                </p>
              )} */}
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Company Name</p>
              <input
                type="text"
                placeholder="Company Name"
                {...register("companyName", {
                  required: true,
                  minLength: 2,
                  maxLength: 80,
                })}
                className="w-full rounded-md"
              />
              {errors.company_name?.type === "required" && (
                <p className="text-red-600">Company Name is required</p>
              )}
              {errors.company_name?.type === "minLength" && (
                <p className="text-red-600">
                  Name must be at least 2 characters
                </p>
              )}
              {errors.company_name?.type === "maxLength" && (
                <p className="text-red-600">Name cannot exceed 80 characters</p>
              )}
            </div>
            <div className="mt-3">
              <p className="text-lg font-semibold">Password</p>
              <label className="flex justify-center items-center">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="w-full rounded-md"
                />
                <button
                  type="button"
                  className="-ms-7"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </button>
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
            </div>
            {error && <p className="text-red-600 my-2">{error}</p>}
            <input
              className="w-full cursor-pointer rounded-md custom_red_color py-3 my-4 text-white font-semibold"
              type="submit"
              value="Sign Up"
            />
            <p className="text-center">
              Already have an account?
              <span
                onClick={() => {
                  setIsSingUp(false);
                  setShowPass(false), reset();
                }}
                className="font-semibold cursor-pointer"
              >
                {" "}
                Sign In
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
