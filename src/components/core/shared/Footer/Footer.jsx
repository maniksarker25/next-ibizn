import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [hoveredImages, setHoveredImages] = useState({
    twitter: false,
    telegram: false,
    facebook: false,
    instagram: false,
    phone: false,
  });

  const handleMouseEnter = (imageName) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageName]: true,
    }));
  };

  const handleMouseLeave = (imageName) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageName]: false,
    }));
  };

  return (
    <div className="bg-[#272727] py-16">
      <div className="customContainer px-5 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3  xl:space-y-3 lg:space-y-0 space-y-3">
          <div className="">
            <img
              src="/images/client/footerLogo.svg"
              className="w-[120px] xl:w-[150px]"
              alt="footer Logo"
            />
          </div>
          <div className="md:flex lg:flex-col justify-center md:ms-3 lg:ms-0">
            <div>
              <h1 className="text-primary text-lg font-bold font-outfit">
                Drivers
              </h1>
              <div className="text-gray mt-3">
                <h1>About Us</h1>
                <h1>Groups or Charters</h1>
                <h1>Contact Us</h1>
                <h1>Terms & Conditions</h1>
                <h1>Privacy Policy</h1>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-primary text-lg font-bold font-outfit">
              Operators
            </h1>
            <div className="text-gray mt-3">
              <Link className="mt-4" href={"/auth"}>
                Login
              </Link>
            </div>
          </div>
          <div className="md:flex lg:flex-col md:justify-center lg:justify-start md:me-3 lg:ms-0">
            <div>
              <h1 className="text-primary text-lg font-bold font-outfit">
                {" "}
                Agents
              </h1>
              <div className="text-gray mt-3">
                <h1>Sign Up</h1>
                <h1>Login</h1>
              </div>
            </div>
          </div>
          <div className="md:flex lg:flex-col md:justify-start lg:justify-start xl:text-end text-start">
            <div>
              <div className="flex gap-3 xl:justify-end text-start">
                <div>
                  <img
                    src={
                      hoveredImages.twitter
                        ? "/images/client/twitterHover.svg"
                        : "/images/client/twitter.svg"
                    }
                    className="size-10"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("twitter")}
                    onMouseLeave={() => handleMouseLeave("twitter")}
                  />
                </div>
                <div>
                  <img
                    src={
                      hoveredImages.telegram
                        ? "/images/client/telegramHover.svg"
                        : "/images/client/telegram.svg"
                    }
                    className="size-10"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("telegram")}
                    onMouseLeave={() => handleMouseLeave("telegram")}
                  />
                </div>
                <div>
                  <img
                    src={
                      hoveredImages.facebook
                        ? "/images/client/facebookHover.svg"
                        : "/images/client/facebook.svg"
                    }
                    className="size-10"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("facebook")}
                    onMouseLeave={() => handleMouseLeave("facebook")}
                  />
                </div>
                <div>
                  <img
                    src={
                      hoveredImages.instagram
                        ? "/images/client/instagramHover.svg"
                        : "/images/client/instagram.svg"
                    }
                    className="size-10"
                    alt="Flowbite Logo"
                    onMouseEnter={() => handleMouseEnter("instagram")}
                    onMouseLeave={() => handleMouseLeave("instagram")}
                  />
                </div>
              </div>

              <div className="mt-5">
                <h1 className="text-[#f1f2f2] text-xl font-normal ">
                  +64 2102413170
                </h1>
                <h1 className="text-primary text-xl font-normal">
                  info@deeparture.travel
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
