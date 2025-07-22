import { Outlet, NavLink } from "react-router";
import { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  const [role] = useRole(user?.email);

  return (
    <div className="md:flex">
      <div className="md:w-64 bg-green-100 p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        {/* Common */}
        <NavLink
          to="/dashboard/profile"
          className="block py-1 text-gray-800 hover:underline"
        >
          My Profile
        </NavLink>

        {/* User Only */}
        {role === "user" && (
          <>
            <NavLink
              to="/dashboard/wishlist"
              className="block py-1 hover:underline"
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/dashboard/bought"
              className="block py-1 hover:underline"
            >
              Property Bought
            </NavLink>
            <NavLink
              to="/dashboard/my-reviews"
              className="block py-1 hover:underline"
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
              className="block py-1 hover:underline"
            >
              Add Property
            </NavLink>
            <NavLink
              to="/dashboard/my-properties"
              className="block py-1 hover:underline"
            >
              My Added Properties
            </NavLink>
            <NavLink
              to="/dashboard/sold-properties"
              className="block py-1 hover:underline"
            >
              My Sold Properties
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              className="block py-1 hover:underline"
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
              className="block py-1 hover:underline"
            >
              Manage Properties
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className="block py-1 hover:underline"
            >
              Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/manage-reviews"
              className="block py-1 hover:underline"
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
