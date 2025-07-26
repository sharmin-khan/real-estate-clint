import { use, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://reak-estate-server.vercel.app",  
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
