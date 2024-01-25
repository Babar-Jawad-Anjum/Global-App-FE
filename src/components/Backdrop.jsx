import React from "react";
import RotateLoader from "react-spinners/RotateLoader";

const Backdrop = () => {
  return (
    <div className="fixed z-10 bg-black bg-opacity-50 w-full h-screen top-0 left-0 flex justify-center items-center">
      <RotateLoader
        color={"#ffffff"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Backdrop;
