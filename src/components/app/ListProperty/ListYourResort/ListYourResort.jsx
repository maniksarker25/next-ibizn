import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ListYourResort = () => {
  const [progress, setProgress] = React.useState(10);
  const increaseProgress = () => {
    setProgress((oldProgress) => Math.min(oldProgress + 10, 100));
  };

  const decreaseProgress = () => {
    setProgress((oldProgress) => Math.max(oldProgress - 10, 0));
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
      {/* 
      
      -------------------
      
      
      */}

      <div className="flex justify-between mt-[75vh] ">
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
      </div>
    </div>
  );
};

export default ListYourResort;
