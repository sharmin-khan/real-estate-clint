import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/images/loader.json";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-52 h-52">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingSpinner;