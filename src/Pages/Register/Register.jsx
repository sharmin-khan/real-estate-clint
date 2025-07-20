import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/images/register.json";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must include at least one capital letter.");
    }
    if (!/[!@#$%^&*(),.?:{}|<>]/.test(password)) {
      return setError("Password must include at least one special character.");
    }

    setError("");
    console.log("Registering user:", { name, photo, email, password });

    //Create USer
    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        Swal.fire({
          icon: "success",
          title: "Register Successfully",
          text: "Your account has been created.",
          timer: 1500,
          showConfirmButton: false,
        });
        form.reset();
         navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Register Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "register Failed",
          text: error.message,
        });
      });
  };
  //Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google Register successful:", result.user);
        Swal.fire({
          icon: "success",
          title: "Google Register Successfully",
          text: "Welcome to your account!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google register Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Google Register Failed",
          text: error.message,
        });
      });
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-10 bg-base-200">
      {/* Left Animation */}
      <div className="w-full md:w-1/2 hidden lg:flex justify-center">
        <Lottie
          animationData={registerAnimation}
          loop={true}
          className="w-96"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-xl p-6 rounded space-y-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <label
            htmlFor="photo url"
            className="block text-gray-700 font-semibold mb-2"
          >
            Photo URL
          </label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />

          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 font-semibold"
          >
            Register
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
              Register with Google
            </button>
          </div>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
