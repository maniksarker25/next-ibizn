import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AddResortForm from "./AddResortForm/AddResortForm";

const AddResort = () => {
  const [progress, setProgress] = React.useState(7);
  const increaseProgress = () => {
    setProgress((oldProgress) => Math.min(oldProgress + 14.28, 100));
  };

  const decreaseProgress = () => {
    setProgress((oldProgress) => Math.max(oldProgress - 14.28, 0));
  };
  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((oldProgress) => {
  //         if (oldProgress === 100) {
  //           return 0;
  //         }
  //         const diff = Math.random() * 10;
  //         return Math.min(oldProgress + diff, 100);
  //       });
  //     }, 500);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);
  return (
    <div>
      <h1 className="text-2xl text-center mt-5 text-black font-bold">
        Add New Resort
      </h1>
      <div className="max-w-screen-xl mx-auto mt-10">
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: "#AFCDB1",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "green", // Change this to your desired color
              },
            }}
          />
        </Box>
        <div className="my-5">
          <AddResortForm
            increaseProgress={increaseProgress}
            decreaseProgress={decreaseProgress}
          />
        </div>

        {/* <div className="flex justify-between mt-[75vh] ">
        <button
          onClick={decreaseProgress}
          className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
        >
          Back
        </button>
        <button
          onClick={increaseProgress}
          className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold "
        >
          Next
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default AddResort;
