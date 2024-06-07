import React from "react";

const starRating = 3;

const BestBoard = () => {
  return (
    <div className="bg-[#F1F2F2]  py-24">
      <div className="customContainer px-5 xl:px-0">
        <div>
          <h1 className="lg:text-title md:text-5xl  text-4xl  font-[250] font-outfit text-primary mb-5">
            Best of this month
          </h1>
          <h2 className="text-gray-500 md:text-2xl md:leading-[26px] text-lg   mt-3 text-secondary">
            Every month we select the best resorts and liveboards, according to
            your reviews
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4   gap-14">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} className="mt-10 text-center">
              <div>
                <img
                  className="mx-auto size-28 md:size-40 rounded-full object-cover"
                  src="/images/client/boat.jpg"
                  alt=""
                />
              </div>
              <div className="mt-3 ">
                <h1 className="text-primary text-xl md:text-2xl leading-5 md:leading-[24px] md:w-[255px] font-light mx-auto text-center font-outfit">
                  Emperor Elite Liveaboard
                </h1>
                <h2 className="text-[#9d9d9c] font-normal text-lg">
                  Liveboard / Egypt
                </h2>
                <div className="mt-3 flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <div className="" key={index}>
                      {star <= 3 ? (
                        <img
                          className="size-[22px]"
                          src="/images/client/starFull.svg"
                          alt=""
                        />
                      ) : (
                        <img
                          className="size-[22px]"
                          src="/images/client/starEmpty.svg"
                          alt=""
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button className="button3 text-white  hover:bg-primary hover:text-white">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestBoard;
