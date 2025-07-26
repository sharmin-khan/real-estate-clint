import { Outlet, NavLink } from "react-router";
import { use } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../component/LoadingSpinner/LoadingSpinner";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [role, loading] = useRole(user?.email);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="md:flex min-h-screen">
      {/* Mobile header with toggle button */}
      <div className="md:hidden flex items-center justify-between bg-green-100 p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-green-700 focus:outline-none"
          aria-label="Open sidebar"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-green-100 p-4 transform
          md:static md:translate-x-0 md:flex md:flex-col md:w-64 md:min-h-screen
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button on mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-green-700 focus:outline-none"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        {/* Common */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            "block py-1 text-gray-800 hover:underline" +
            (isActive ? " font-bold text-green-700" : "")
          }
          onClick={() => setSidebarOpen(false)}
        >
          My Profile
        </NavLink>

        {/* User Only */}
        {role === "user" && (
          <>
            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/dashboard/bought"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Property Bought
            </NavLink>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Reviews
            </NavLink>
          </>
        )}

        {/* Agent Only */}
        {role === "agent" && (
          <>
            <NavLink
              to="/dashboard/add-property"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Add Property
            </NavLink>
            <NavLink
              to="/dashboard/my-properties"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Added Properties
            </NavLink>
            <NavLink
              to="/dashboard/sold-properties"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Sold Properties
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Requested Properties
            </NavLink>
          </>
        )}

        {/* Admin Only */}
        {role === "admin" && (
          <>
            <NavLink
              to="/dashboard/manage-properties"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Manage Properties
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/manage-reviews"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
              onClick={() => setSidebarOpen(false)}
            >
              Manage Reviews
            </NavLink>
          </>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
