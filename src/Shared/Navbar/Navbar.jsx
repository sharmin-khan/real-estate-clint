import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/building.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import ThemeToggle from "../../component/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger state

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-semibold lg:text-base hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          onClick={() => setIsMenuOpen(false)}
          className="font-semibold lg:text-base hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          onClick={() => setIsMenuOpen(false)}
          className="font-semibold lg:text-base hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/offers"
          onClick={() => setIsMenuOpen(false)}
          className="font-semibold lg:text-base hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Offers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          onClick={() => setIsMenuOpen(false)}
          className="font-semibold lg:text-base hover:underline hover:decoration-green-500 hover:underline-offset-8 hover:bg-transparent focus:bg-transparent active:bg-transparent [&.active]:text-green-500"
        >
          Blogs
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
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
    <div className="bg-base-100 dark:text-white sticky top-0 z-50 transition">
      <div className="navbar w-11/12 mx-auto p-0 py-2">
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-1">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                title={user.displayName}
                className="w-10 h-10 rounded-full border border-green-500"
              />
              <span className="font-semibold lg:text-sm text-green-500 hidden sm:inline">
                {user.displayName || "User"}
              </span>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className=" lg:block hidden text-white bg-red-500 lg:text-base text-sm font-semibold border border-red-500 px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                to="/login"
                className=" lg:block hidden lg:text-base text-sm font-semibold border px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-white hover:text-green-500 cursor-pointer transition"
              >
                Login
              </Link>
            </>
          )}

          {/* Hamburger for Mobile */}
          <div className="lg:hidden">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <ul className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-full z-50">
                {navLinks}
                {user ? (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-500 font-semibold w-24 border border-red-500 px-2 py-1 rounded-lg flex justify-center items-center"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="font-semibold text-green-500 border border-green-500 px-2 py-1  w-24 rounded-lg flex justify-center items-center"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
