import React from "react";
import { Link } from "react-router";
import errorpage from "../../assets/images/error.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex justify-center text-center mx-auto mt-26 flex-col ">
        <div className="flex justify-center items-center">
          <Lottie animationData={errorpage} loop={true} className="w-[20%]" />
        </div>
        <h1 className="text-4xl font-extrabold text-red-500">
          404-Page Not Found
        </h1>
        <p className="text-xl font-semibold">
          Oops! The Page you're looking for doesn't exist
        </p>
        <div>
          <Link to="/">
            <button className="btn mt-5 bg-[#56b92f] rounded-sm p-3 text-white font-bold hover:bg-[#498147] ">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;