import { Outlet, NavLink, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../component/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import ThemeToggle from "../component/ThemeToggle/ThemeToggle";
import logo from "../assets/images/logo.png";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role, loading] = useRole(user?.email);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

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
    <>
      <Helmet>
        <title>Dashboard - PropEase</title>
        <meta
          name="description"
          content="Access your dashboard on PropEase. Manage your profile, properties, reviews, and more."
        />
      </Helmet>

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-green-900 to-green-600/50 text-white p-4 flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Link to="/" className="hidden lg:block text-xl font-extrabold mb-4">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-400 to-green-500">
                PropEase
              </span>
            </div>
          </Link>

          {/* Links container */}
          <div className="flex-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                  isActive ? "font-bold text-black" : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                  isActive ? "font-bold text-black" : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Profile
            </NavLink>

            {/* User Links */}
            {role === "user" && (
              <>
                <NavLink
                  to="/dashboard/wishlist"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Wishlist
                </NavLink>
                <NavLink
                  to="/dashboard/bought"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Property Bought
                </NavLink>
                <NavLink
                  to="/dashboard/my-reviews"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  My Reviews
                </NavLink>
              </>
            )}

            {/* Agent Links */}
            {role === "agent" && (
              <>
                <NavLink
                  to="/dashboard/add-property"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Add Property
                </NavLink>
                <NavLink
                  to="/dashboard/my-properties"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  My Added Properties
                </NavLink>
                <NavLink
                  to="/dashboard/sold-properties"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  My Sold Properties
                </NavLink>
                <NavLink
                  to="/dashboard/requests"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Requested Properties
                </NavLink>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <NavLink
                  to="/dashboard/manage-properties"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Manage Properties
                </NavLink>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/manage-reviews"
                  className={({ isActive }) =>
                    `block py-2 text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white/90 ${
                      isActive ? "font-bold text-black" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  Manage Reviews
                </NavLink>
              </>
            )}
          </div>

          {/* Logout button */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 mt-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
              Logout
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-h-screen lg:ml-64 w-full">
          {/* Desktop header */}
          <div className="bg-gradient-to-br from-green-800 to-green-600/50 hidden lg:flex justify-between items-center px-4 py-3 sticky top-0 z-20">
            <div className="text-xl font-bold text-white">
              Welcome to Dashboard
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user && (
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName || "User"}
                  title={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-green-500"
                />
              )}
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between sticky top-0 z-30 bg-green-500 px-4 py-3 shadow">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user && (
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName || "User"}
                  title={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-green-500"
                />
              )}
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;
