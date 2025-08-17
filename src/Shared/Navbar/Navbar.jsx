import { Link, NavLink } from "react-router";
import logo from "../../assets/images/building.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import ThemeToggle from "../../component/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-semibold lg:text-lg hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className="font-semibold lg:text-lg  hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="font-semibold lg:text-lg hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
        Swal.fire({
          icon: "success",
          title: "Log out Successfully",
          text: "You have been logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className=" bg-white sticky top-0 z-50  ">
      <div className="navbar w-11/12 mx-auto p-0 py-2 ">
        {/* Left Side Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center text-xl font-extrabold">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-800 to-green-500">
              PropEase
            </span>
          </Link>
        </div>

        {/* Center Menu - Desktop only */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                title={user.displayName}
                className="w-10 h-10 rounded-full border border-green-500"
              />
              <span className="font-semibold text-green-700 hidden sm:inline">
                {user.displayName || "User"}
              </span>
              <ThemeToggle /> {/* ✅ সব ডিভাইসে user এর পাশে toggle */}
              <button
                onClick={handleLogout}
                className="text-red-500 lg:text-lg text-sm font-semibold border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ThemeToggle /> {/* ✅ Login না থাকলেও পাশে toggle */}
              <Link
                to="/login"
                className="lg:text-lg text-sm font-semibold border px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-white hover:text-green-500 cursor-pointer transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
