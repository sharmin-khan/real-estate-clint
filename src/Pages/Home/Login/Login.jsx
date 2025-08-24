import React, { use } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/images/login.json";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const Login = () => {
  const { logInUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("From path:", from);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    //Log in User
    logInUser(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
          form.reset();
          navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Enter valid email and password.",
        });
      });
  };
  // Google Sign In
 const handleGoogleSignIn = () => {
  signInWithGoogle()
    .then((result) => {
      const loggedUser = result.user;

      const savedUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: "user",
        status: "active"
      };

      // Save to database
   fetch("https://reak-estate-server.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedUser),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Google Log In Successfully",
            text: "Welcome to your account!",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(from, { replace: true });
        });
    })
    .catch((error) => {
      console.error("Google Log In Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Google Log In Failed",
        text: error.message,
      });
    });
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-6">
      {/* Left: Lottie Animation */}
      <div className="w-full md:w-1/2 max-w-lg lg:block hidden ">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
               name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
               name="password" 
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 font-semibold"
          >
            Login
          </button>
          <div className="text-center mb-3">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
