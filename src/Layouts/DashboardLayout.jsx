import { Outlet, NavLink } from "react-router";
import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../component/LoadingSpinner/LoadingSpinner";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [role, loading] = useRole(user?.email);
  if (loading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="md:flex">
      <div className="md:w-64 bg-green-100 p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

            {/* Common */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            "block py-1 text-gray-800 hover:underline" +
            (isActive ? " font-bold text-green-700" : "")
          }
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
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/dashboard/bought"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
            >
              Property Bought
            </NavLink>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
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
            >
              Add Property
            </NavLink>
            <NavLink
              to="/dashboard/my-properties"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
            >
              My Added Properties
            </NavLink>
            <NavLink
              to="/dashboard/sold-properties"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
            >
              My Sold Properties
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
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
            >
              Manage Properties
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
            >
              Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/manage-reviews"
              className={({ isActive }) =>
                "block py-1 hover:underline" +
                (isActive ? " font-bold text-green-700" : "")
              }
            >
              Manage Reviews
            </NavLink>
          </>
        )}
      </div>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;