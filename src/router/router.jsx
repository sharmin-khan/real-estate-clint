import { createBrowserRouter } from "react-router";

import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import RoleBasedRoute from "../routes/RoleBasedRoute"; // Import RoleBasedRoute
import ErrorPage from "../component/ErrorPage/ErrorPage";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Register/Register";
import PropertyDetailsPage from "../Pages/PropertyDetailsPage/PropertyDetailsPage";
import AllProperties from "../Pages/AllProperties/AllProperties";
import MakeOffer from "../Pages/MakeOffer/MakeOffer";

// Common Profile Wrapper
import Profile from "../Dashboard/Profile";

// User components
import WishlistPage from "../Pages/WishlistPage/WishlistPage";
import PropertyBought from "../Dashboard/user/PropertyBought";
import MyReviews from "../Dashboard/user/MyReviews";

// Agent components
import AddProperty from "../Dashboard/Agent/AddProperty";
import MyAddedProperties from "../Dashboard/Agent/MyAddedProperties";
import RequestedProperties from "../Dashboard/Agent/RequestedProperties";
import MySoldProperties from "../Dashboard/Agent/MySoldProperties";
import UpdateProperty from "../Dashboard/Agent/UpdateProperty";

// Admin components
import ManageProperties from "../Dashboard/Admin/ManageProperties";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageReviews from "../Dashboard/Admin/ManageReviews";
import Payment from "../Pages/Payment/Payment";
import Blogs from "../Pages/Blogs/Blogs";
import OffersDeals from "../Pages/OffersDeals/OfferrsDeals";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
        path: "all-properties",
        element: (
            <AllProperties></AllProperties>
        ),
      },
      {
        path: "blogs",
        Component: Blogs
      },
         {
        path: "offers",
        Component: OffersDeals
      },
      {
        path: "property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "make-offer/:propertyId",
        element: (
          <PrivateRoute>
            <MakeOffer />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // Common profile route for all roles
          {
            path: "profile",
            element: <Profile />,
          },

          // User routes (Protected)
          {
            path: "wishlist",
            element: (
              <RoleBasedRoute allowedRoles={["user"]}>
                <WishlistPage />
              </RoleBasedRoute>
            ),
          },
          {
            path: "bought", // Fixed path
            element: (
              <RoleBasedRoute allowedRoles={["user"]}>
                <PropertyBought />
              </RoleBasedRoute>
            ),
          },
          {
            path: "my-reviews",
            element: (
              <RoleBasedRoute allowedRoles={["user"]}>
                <MyReviews />
              </RoleBasedRoute>
            ),
          },

          // Agent routes (Protected)
          {
            path: "add-property",
            element: (
              <RoleBasedRoute allowedRoles={["agent"]}>
                <AddProperty />
              </RoleBasedRoute>
            ),
          },
          {
            path: "my-properties", // Fixed path
            element: (
              <RoleBasedRoute allowedRoles={["agent"]}>
                <MyAddedProperties />
              </RoleBasedRoute>
            ),
          },
          {
            path: "sold-properties", // Fixed path
            element: (
              <RoleBasedRoute allowedRoles={["agent"]}>
                <MySoldProperties />
              </RoleBasedRoute>
            ),
          },
          {
            path: "requests", // Fixed path
            element: (
              <RoleBasedRoute allowedRoles={["agent"]}>
                <RequestedProperties />
              </RoleBasedRoute>
            ),
          },
          {
            path: "update-property/:id",
            element: (
              <RoleBasedRoute allowedRoles={["agent"]}>
                <UpdateProperty />
              </RoleBasedRoute>
            ),
          },

          // Admin routes (Protected)
          {
            path: "manage-properties",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageProperties />
              </RoleBasedRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            ),
          },
          {
            path: "manage-reviews",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageReviews />
              </RoleBasedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
