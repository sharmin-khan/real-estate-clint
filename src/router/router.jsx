import { createBrowserRouter } from "react-router";

import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Register/Register";

// User components
import MyProfile from "../Dashboard/user/MyProfile";
import Wishlist from "../Dashboard/user/Wishlist";
import PropertyBought from "../Dashboard/user/PropertyBought";
import MyReviews from "../Dashboard/user/MyReviews";

// Agent components
import AddProperty from "../Dashboard/agent/AddProperty";
import AgentProfile from "../Dashboard/agent/AgentProfile";
import MyAddedProperties from "../Dashboard/Agent/MyAddedProperties";
import RequestedProperties from "../Dashboard/agent/RequestedProperties";
import MySoldProperties from "../Dashboard/Agent/MySoldProperties";

// Admin components
import AdminProfile from "../Dashboard/Admin/AdminProfile";
import ManageProperties from "../Dashboard/admin/ManageProperties";
import ManageUsers from "../Dashboard/admin/ManageUsers";
import ManageReviews from "../Dashboard/admin/ManageReviews";






const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
         Component: Login,
      },
      {
        path: "register",
         Component: Register,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // Common user profile
          { path: "my-profile", Component: MyProfile },

          // user routes
          { path: "wishlist", Component: Wishlist },
          { path: "property-bought",Component: PropertyBought },
          { path: "my-reviews", Component: MyReviews },

          // agent routes
          { path: "add-property",Component: AddProperty },
          { path: "agent-profile", Component: AgentProfile },
          { path: "my-added-properties", Component: MyAddedProperties },
          { path: "requests-properties", Component: RequestedProperties },
           { path: "my-sold-properties", Component: MySoldProperties },
          // admin routes
           { path: "admin-profile", Component: AdminProfile },
          { path: "manage-properties", Component: ManageProperties },
          { path: "manage-users", Component: ManageUsers },
          { path: "manage-reviews", Component: ManageReviews },
        ],
      },
    ],
  },
]);

export default router;
