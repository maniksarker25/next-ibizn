import React, { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
import "aos/dist/aos.css";

const PropertyItem = ({ isPropertyShow }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className={`flex flex-wrap`} data-aos="zoom-in">
      <div className="w-6/12 px-7 py-12 custom_red_color ">
        <h3 className=" font-bold text-3xl leading-9 text-white mb-3">
          I operate a single boat...
        </h3>
        <p className="font-normal text-base leading-6 text-white mb-10">
          Suitable for boad owner or manager that operates a boat with less than
          20 guest rooms or for those who have limited experience or are new to
          the hospitality industry...
        </p>
        <button className=" cards w-64 h-16 bg-white text-black font-bold text-lg text-center rounded-full shadow-md hover:shadow-xl">
          List your boat
        </button>
      </div>
      <div className="w-6/12 px-5 py-12">
        <h3 className="font-bold text-3xl leading-9 mb-3">
          I operate single Resoart...
        </h3>
        <p className="font-normal text-base leading-6  mb-10">
          Suitable for Resoart owner or manager that operates a resoart with
          less than 200 guest rooms or for those who have limited experience or
          are new to the hospitality industry...
        </p>
        <Link
          href={""}
          className=" cards w-64 h-16 custom_red_color text-white font-bold text-base text-center rounded-full shadow-md hover:shadow-xl"
        >
          List your resoart
        </Link>
      </div>
    </div>
  );
};

export default PropertyItem;
