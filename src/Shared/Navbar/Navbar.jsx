import { Link, NavLink } from "react-router";
import logo from "../../assets/images/logo.avif";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } =use(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-semibold lg:text-lg text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className="font-semibold lg:text-lg text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="font-semibold lg:text-lg text-gray-700 hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        // optionally show a toast or alert
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 container mx-auto">
      {/* Left Side Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <img src={logo} alt="logo" className="w-16 h-16" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-800 to-green-700">
            PropEase
          </span>
        </Link>
      </div>

      {/* Center Menu - Desktop only */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {/* Mobile dropdown */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>

        {/* User info or login button */}
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border border-green-500"
              title={user.displayName}
            />
            <span className="hidden md:inline font-semibold text-green-700">{user.displayName || "User"}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="lg:text-lg font-semibold border px-4 py-2 bg-green-500 text-white rounded hover:bg-white hover:text-green-500"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
